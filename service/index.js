require('dotenv').config({ path: __dirname + '/.env' });

const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

let users = [];
let journals = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Serve up the front-end static content hosting
app.use(express.static('public'));

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Sign up
apiRouter.post('/auth/signup', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.email, req.body.username, req.body.password, req.body.country, req.body.language, req.body.age)

        setAuthCookie(res, user.token);
        res.send({ user: user });
    }
});

// Login
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            await DB.updateUser(user)
            setAuthCookie(res, user.token);
            res.send({ user: user });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// Logout
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// Middleware
const verifyAuth = async(req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.clearCookie(authCookieName);
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// Get all users
apiRouter.get('/users', verifyAuth, (req, res) => {
  res.send(users);
});

// Get Specific User
apiRouter.get('/users/:userId', verifyAuth, async (req, res) => {
  const userId = req.params.userId
  const user = await findUser('userId', userId);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ msg: 'User not found' })
  }
});

// Get Journals
apiRouter.get('/journals', verifyAuth, async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    res.send(journals);
    return;
  }
  const user = await findUser('userId', userId);
  const journalIds = user.journals;
  const userJournals = []
  for (const journalId of journalIds) {
    const journal = await findJournal('journalId', journalId);
    userJournals.push(journal);
  }
  res.send(userJournals);
});

// Create Journal
apiRouter.post('/journal', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  const journals = createJournal(user.userId, req.body.topic, req.body.entry)
  res.send(journals);
});

// Update Journal as read
apiRouter.put('/journal/:journalId', verifyAuth, async(req, res) => {
  const journal = await findJournal('journalId', req.params.journalId);
  if (!journal) {
    return res.status(404).send({ msg: 'Journal not found' });
  }
  journal.reads += 1;
  res.send(journal);
});

// Translate
apiRouter.post('/translate', verifyAuth, async (req, res) => {
  try {
    const { texts, to } = req.body;

    const response = await fetch(process.env.LECTO_URL, {
      method: "POST",
      headers: {
        "X-API-Key": `${process.env.LECTO_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ texts, to })
    });

    const data = await response.json()
    res.send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send({ msg: 'Translation failed'});
  }
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

async function createUser(email, username, password, country, language, age) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    userId: uuid.v4(),
    token: uuid.v4(),
    email: email,
    username: username,
    password: passwordHash,
    country: country,
    language: language,
    age: age,
    journals: [],
    createdDate: new Date().toLocaleDateString(),
    lastLogin: new Date().toLocaleDateString()
  };
  await DB.addUser(user)

  return user;
}

async function createJournal(userId, topic, entry) {
  const journalId = uuid.v4()
  const journal = {
    journalId: journalId,
    userId: userId,
    topic: topic,
    entry: entry,
    timestamp: new Date().toLocaleDateString(),
    reads: 0,
  };
  journals.push(journal);
  const user = await findUser('userId', userId)
  user.journals.push(journalId);

  return journals;
}

// Find a user by field such as id, etc.
async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

// Find a journal by field such as id, etc.
async function findJournal(field, value) {
  if (!value) return null;

  return journals.find((u) => u[field] === value);
}

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});