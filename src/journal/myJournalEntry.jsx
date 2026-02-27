import React from "react";
import { timeConverter } from "./timeConverter";

export function MyJournalEntry({ journalEntry }) {
    let entry = journalEntry.entry;
    let topic = journalEntry.topic.substring(0, 20);
    let reads = journalEntry.reads.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let timestamp = timeConverter(journalEntry.timestamp);

    return(
      <div className="bg-neutral-primary-soft block p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{topic}</h5>
            <p className="text-body mb-6">{reads} reads</p>
          </div>
          <p className="text-body mb-6">{entry}</p>
          <p className="font-semibold float-right">{timestamp}</p>
        </div>
    );
  }