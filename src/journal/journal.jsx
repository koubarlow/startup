import React, { useEffect, useState } from 'react';
import { JournalNotifier } from './journalReadNotifier';
import { MyJournalEntry } from './myJournalEntry';
import { MyNotification } from './myNotification';
import { CreateJournalEntryModal } from './createJournalEntryModal';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../login/authState';

export function Journal({ userId, onAuthChange }) {
  const userData = [];
  const [showCreateJournalEntryModal, setShowCreateJournalEntryModal] = React.useState(false);
  const [notifications, setMyNotifications] = React.useState([]);
  const [myJournals, setMyJournals] = React.useState([]);
  const [allUsers, setAllUsers] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getUsers();
    fetchUserJournals();

    return () => {
      JournalNotifier.removeHandler(handleJournalEvent);
    };
  }, []);

  function handleJournalEvent(notification) {
    setMyNotifications((prevEvents) => {
      let newEvents = [notification, ...prevEvents];
      if (newEvents.length > 3) {
        newEvents = newEvents.slice(1, 3);
      }
      return newEvents;
    });
  }

  async function getUsers() {
    const res = await fetch('/api/users');
    if (res.status == 401) {
        localStorage.removeItem('username');
        localStorage.removeItem('currentUserId');
        onAuthChange('', '', AuthState.Unauthenticated)
        navigate('/');
        return;
    }
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    const users = await res.json();
    setAllUsers(users);
    JournalNotifier.addHandler(handleJournalEvent);
  }

  function createNotifications() {
    const notificationArray = [];

    for (const [i, notification] of notifications.entries()) {
      if (myJournals.length <= 0) { return }
      if (allUsers.length <= 0) { return }
      let randomUserIndex = Math.floor(Math.random() * allUsers.length);
      let user = allUsers[randomUserIndex];
      let username = user.username;
      let timestamp = Date.now();
      let randomJournalIndex = Math.floor(Math.random() * myJournals.length);
      let journal = myJournals.at(randomJournalIndex);
      let journalTitle = journal.topic;
      let journalDate = journal.timestamp;

      notificationArray.push(
        <MyNotification 
        key={i}
        username={username}
        journalTitle={journalTitle}
        journalDate={journalDate}
        timestamp={timestamp}
        />
      );
    }
    return notificationArray;
  }

  async function createJournalEntry(topic, entry) {
    const newEntry = { topic: topic, entry: entry }
    await fetch('/api/journal', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(newEntry),
    });
    fetchUserJournals();
  }

  async function fetchUserJournals() {
    try {
      const res = await fetch(`/api/journals?userId=${userId}`);
      switch (res.status) {
        case 401:
          localStorage.removeItem('username');
          localStorage.removeItem('currentUserId');
          onAuthChange('', '', AuthState.Unauthenticated)
          navigate('/');
          return;
      }
      if (!res.ok) {
        throw new Error('Failed to fetch journals');
      }
      const journals = await res.json();
      setMyJournals(journals);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <main>
      {showCreateJournalEntryModal && (
        <CreateJournalEntryModal 
            setShowCreateJournalEntryModal={setShowCreateJournalEntryModal}
            createEntry={createJournalEntry}
          />
        )}

      <div className="notifications">{createNotifications()}</div>
      
      <h1>Journal</h1>
      <button onClick={() => setShowCreateJournalEntryModal(prev => !prev)} type="button" className="mt-2 inline-flex items-center text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-base text-base px-6 py-3.5 focus:outline-none">
        <svg className="w-6 h-6 me-1.5 -ms-0.5 text-gray-800 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z" clipRule="evenodd"/>
        </svg>
          New Entry
      </button>
      
      <div className="grid grid-cols-1 gap-4 mx-8 my-3">
        {myJournals.map(entry => (
          <MyJournalEntry
            key={entry.journalId}
            journalEntry={entry}
          />
        ))}
      </div>
      {myJournals.length === 0 && <p className="h-full">Be the first to make a journal entry!</p>}
    </main>
  );
}