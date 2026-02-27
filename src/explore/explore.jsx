import React, { useEffect, useState } from 'react';
import { JournalDetailModal } from './journalDetailModal';
import { ExploreJournalEntry } from './exploreJournalEntry';
import journalData from './journals.json';

export function Explore() {

  const [showJournalDetail, setShowJournalDetail] = useState(false);
  const [journals, setJournals] = useState(journalData?.journals || []);
  const [selectedJournal, setSelectedJournal] = useState(null);

  function entryClicked(journalEntry) {
    setShowJournalDetail(prev => !prev)
    setSelectedJournal(journalEntry)
  }
  
  return (
    <main>
      {showJournalDetail && (
        <JournalDetailModal
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