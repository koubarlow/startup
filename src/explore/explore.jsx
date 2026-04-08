import React, { useEffect, useState } from 'react';
import { JournalDetailModal } from './journalDetailModal';
import { ExploreJournalEntry } from './exploreJournalEntry';
import { JournalEvent, JournalNotifier } from '../journal/journalReadNotifier';
import { AuthState } from '../login/authState';
import { useNavigate } from 'react-router-dom';

export function Explore({ onAuthChange }) {

  const [showJournalDetail, setShowJournalDetail] = useState(false);
  const [journals, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [selectedJournalUser, setSelectedJournalUser] = useState(null);
  const navigate = useNavigate();

  function entryClicked(journalEntry, user) {
    setSelectedJournal(journalEntry);
    setSelectedJournalUser(user);
    setShowJournalDetail(prev => !prev);
    markJournalAsRead(journalEntry);

    const fromUsername = localStorage.getItem('username') || "User";
    const toUserId = user.userId;
    const currentDate = new Date();
    const readJournalDate = journalEntry.timestamp;
    const readJournalTopic = journalEntry.topic;
    JournalNotifier.broadcastEvent(fromUsername, toUserId, currentDate, readJournalDate, readJournalTopic);
  }

  async function markJournalAsRead(journalEntry) {
    try {
      const res = await fetch(`/api/journal/${journalEntry.journalId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (res.status == 401) {
          localStorage.removeItem('username');
          localStorage.removeItem('currentUserId');
          onAuthChange('', '', AuthState.Unauthenticated)
          navigate('/');
          return;
      }
      if (!res.ok) {
        throw new Error('Failed to fetch journals');
      }
      fetchJournals();
    } catch (e) {
      console.error(e);
    }
  }

  async function fetchJournals() {
    try {
      const res = await fetch('/api/journals');
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
      setJournals(journals);
    } catch (e) {
      console.error(e);
    }
  }

  React.useEffect(() => {
    fetchJournals();
  }, []);
  
  return (
    <main>
      {showJournalDetail && (
        <JournalDetailModal
          user={selectedJournalUser}
          journal={selectedJournal}
          setShowJournalDetail={setShowJournalDetail}
          />
        )}
      <h1>Explore</h1>
      {journals.length > 0 &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-8 my-4">
          {journals.map(entry => (
            <ExploreJournalEntry
              key={entry.journalId}
              journalEntry={entry}
              entryClicked={entryClicked}
            />
          ))}
        </div>
      }
        
      {journals.length === 0 && (<div className="flex flex-col items-center justify-center">
        <h3>Be the first to make a journal entry!</h3>
        <button onClick={() => navigate('/journal')} className="mt-8 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-[calc(var(--radius-base)-2px)] group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white">
          <span className=" relative px-8 py-3 transition-all ease-in duration-75 rounded-[calc(var(--radius-base)-2px)] leading-5">
          Create Journal Entry
          </span>
        </button>
        </div>)}
    </main>
  );
}