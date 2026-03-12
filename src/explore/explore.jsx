import React, { useEffect, useState } from 'react';
import { JournalDetailModal } from './journalDetailModal';
import { ExploreJournalEntry } from './exploreJournalEntry';
import journalData from './journals.json';
import { useNavigate } from 'react-router-dom';

export function Explore() {

  const [showJournalDetail, setShowJournalDetail] = useState(false);
  const [journals, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [selectedJournalUser, setSelectedJournalUser] = useState(null);
  const navigate = useNavigate();

  function entryClicked(journalEntry, user) {
    setSelectedJournal(journalEntry);
    setSelectedJournalUser(user);
    setShowJournalDetail(prev => !prev);
  }

  async function fetchJournals() {
    try {
      const res = await fetch('/api/journals');
      switch (res.status) {
        case 401:
          navigate('/');
          return;
      }
      if (!res.ok) {
        throw new Error('Failed to fetch journals');
      }
      const journals = await res.json();
      console.log(journals);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-8 my-4">
        {journals.map(entry => (
          <ExploreJournalEntry
            key={entry.journalId}
            journalEntry={entry}
            entryClicked={entryClicked}
          />
        ))}
      </div>
    </main>
  );
}