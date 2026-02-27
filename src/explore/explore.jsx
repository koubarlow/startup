import React, { useEffect, useState } from 'react';
import { JournalDetailModal } from './journalDetailModal';
import journalData from './journals.json';
import userData from './users.json';

export function Explore() {

  const [showJournalDetail, setShowJournalDetail] = useState(false);
  const [journals, setJournals] = useState(journalData?.journals || []);

  function ExploreEntry({ journalEntry }) {
    let entry = journalEntry.entry.substring(0, 100);
    let topic = journalEntry.topic.substring(0, 20);
    let reads = journalEntry.reads.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let journalUser = userData.users.find(user => user.userId === journalEntry.userId);
    let username = journalUser.username;

    return(
      <div onClick={() => setShowJournalDetail(prev => !prev)} className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
        <div className="flex justify-between">
          <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{topic}</h5>
          <p className="text-body mb-6">{reads} reads</p>
        </div>
        <p className="text-body mb-6">{entry}...</p>
        <p className="font-semibold float-right">{username}</p>
      </div>
    );
  }
  
  return (
    <main>
      {showJournalDetail && (
        <JournalDetailModal 
          showJournalDetail={showJournalDetail}
          setShowJournalDetail={setShowJournalDetail}/>
        )}
      <h1>Explore</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-8 my-4">
        {journals.map(entry => (
          <ExploreEntry
            key={entry.journalId}
            journalEntry={entry}
          />
        ))}
      </div>
    </main>
  );
}