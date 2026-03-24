
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const journalCollection = db.collection('journal');

(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connected to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

//getUsers

//getUserByEmail
function getUser(email) {
  return userCollection.findOne({ email: email });
}

//getUserByLookup
function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

//addUser
async function addUser(user) {
  await userCollection.insertOne(user);
}

//updateUser
async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

//updateUserRemoveAuth
async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

//getJournals

//addJournal

//updateJournal

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser
};