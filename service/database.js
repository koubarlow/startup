
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

// GET journal by journal ID
// GET all journals
// GET user by userId
// GET all users
// GET journals by UserID

//getUsers
function getUsers() {
    return userCollection.find();
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
    return journalCollection.find();
}

//getJournalByID
function getJournalByJournalId(journalId) {
  return journalCollection.findOne({ journalId: journalId });
}

//getJournalsByUserID
function getJournalsByUserId(userId) {
  return journalCollection.find({ userId: userId });
}

//addJournal
async function addJournal(journal) {
    await journalCollection.insertOne(journal);
}

//updateJournal
async function updateJournal(journal) {
    let reads = journal.reads++;
    await journalCollection.updateOne({ journalId: journal.journalId }, { $set: reads }) // set reads
}

module.exports = {
  getUsers,
  getUserByEmail,
  getUserByToken,
  getUserByUserId,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  getJournals,
  getJournalByJournalId,
  getJournalsByUserId,
  addJournal,
  updateJournal
};