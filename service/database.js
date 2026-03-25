
const { MongoClient } = require('mongodb');
const dbConfig = require('./dbConfig.json');

const url = `mongodb+srv://${dbConfig.userName}:${dbConfig.password}@${dbConfig.hostname}`;
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

// GET journal by journal ID
// GET all journals
// GET user by userId
// GET all users
// GET journals by UserID

//getUsers
function getUsers() {
    const userCursor = userCollection.find().limit(100);
    return userCursor.toArray();
}

//getUserByEmail
function getUserByEmail(email) {
  return userCollection.findOne({ email: email });
}

function getUserByUserId(userId) {
  return userCollection.findOne({ userId: userId });
}

//getUserByLookup
function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

//getUserByLookup
async function getUserCountByLanguage(language) {
  const userCursor = userCollection.find({ language: language });
  const userArray = await userCursor.toArray();
  return userArray.length;
}

//addUser
async function addUser(user) {
  await userCollection.insertOne(user);
}

//updateUser
async function updateUser(user) {
  await userCollection.updateOne({ userId: user.userId }, { $set: user });
}

//updateUserRemoveAuth
async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ userId: user.userId }, { $unset: { token: 1 } });
}

//getJournals
function getJournals() {
    // limit to top 20 or so?
    // filter by most recent?
    const journalCursor = journalCollection.find().limit(100);
    return journalCursor.toArray();
}

//getJournalByID
function getJournalByJournalId(journalId) {
  return journalCollection.findOne({ journalId: journalId });
}

//getJournalsByUserID
function getJournalsByUserId(userId) {
  const journalCursor = journalCollection.find({ userId: userId }).limit(100);
  return journalCursor.toArray();
}

//addJournal
async function addJournal(journal) {
    await journalCollection.insertOne(journal);
}

//updateJournal
async function updateJournal(journal) {
    const reads = journal.reads;
    const newReads = reads + 1;
    const journalId = journal.journalId;
    await journalCollection.updateOne({ journalId: journalId }, { $set: {reads: newReads} }); // set reads
}

module.exports = {
  getUsers,
  getUserByEmail,
  getUserByToken,
  getUserByUserId,
  getUserCountByLanguage,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  getJournals,
  getJournalByJournalId,
  getJournalsByUserId,
  addJournal,
  updateJournal
};