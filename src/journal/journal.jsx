import React from 'react';
import { JournalNotifier } from './journalReadNotifier';

export function Journal() {

  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    JournalNotifier.addHandler(handleJournalEvent);

    return () => {
      JournalNotifier.removeHandler(handleJournalEvent);
    };
  }, []);

  function handleJournalEvent(event) {
    setEvent((prevEvents) => {
      let newEvents = [event, ...prevEvents];
      if (newEvents.length > 10) {
        newEvents = newEvents.slice(1, 10);
      }
      return newEvents;
    });
  }

  function createJournalEventArray() {
    const messageArray = [];
    for (const [i, event] of events.entries()) {
      // let user = localStorage.getItem(event.userId);
      // let username = user.username;
      // let timestamp = event.timestamp;
      // let journal = localStorage.getItem(event.journalId)
      // let journalName = journal.name;
      // let message = timestamp + " " + username + " read your " + journalName;

      messageArray.push(
        <div key={i} id="alert-1" className="flex sm:items-center p-4 mb-1 text-sm text-fg-brand-strong rounded-base bg-brand-soft color-brand-100" role="alert">
          <svg className="w-4 h-4 shrink-0 mt-0.5 md:mt-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
          <span className="sr-only">Info</span>
          <div className="ms-2 text-sm">
            10:39am GMT+9: くりさん read your Jan. 26 journal
          </div>
            <button type="button" className="ms-auto -mx-1.5 -my-1.5 rounded focus:ring-2 focus:ring-brand-medium hover:bg-brand-200 inline-flex items-center justify-center h-8 w-8 shrink-0 shrink-0" data-dismiss-target="#alert-1" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
          </button>
        </div>
      );
    }
    return messageArray;
  }

  return (
    <main>
      <div className="notifications">{createJournalEventArray()}</div>
      
      <button type="button" className="mt-2 inline-flex items-center text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-base text-base px-6 py-3.5 focus:outline-none">
      <svg className="w-6 h-6 me-1.5 -ms-0.5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z" clipRule="evenodd"/>
      </svg>
        Enter in Journal
      </button>
      
      <div className="grid grid-cols-1 gap-4 mx-8 my-3">
        <div className="bg-neutral-primary-soft block p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Side Hustles</h5>
            <p className="text-body mb-6">50k reads</p>
          </div>
          <p className="text-body mb-6">Lately I’ve been thinking a lot about side hustles and how people make extra money outside of their main job. I like my housing, but rent and daily expenses still make me want more financial flexibility. I’ve tried doing small freelance work online, and while it’s tiring after a full day of work, it feels empowering to build something on my own. It also makes me curious about how people in other countries balance multiple jobs and rest.</p>
          <p className="font-semibold float-right">Jan. 27, 2026</p>
        </div>
        <div className="bg-neutral-primary-soft block p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Burnout</h5>
            <p className="text-body mb-6">6.3k reads</p>
          </div>
          <p className="text-body mb-6">This week I felt burned out more than usual. Even though I like my housing and feel comfortable where I live, the routine of work, commuting, and responsibilities can feel heavy. Sometimes I stay inside longer than I should and lose motivation to do things I normally enjoy. Writing this helps me slow down and realize that burnout isn’t just about work—it’s about not giving myself enough mental space.</p>
          <p className="font-semibold float-right">Jan. 26, 2026</p>
        </div>
        <div className="bg-neutral-primary-soft block p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Rising Prices</h5>
            <p className="text-body mb-6">12.3k reads</p>
          </div>
          <p className="text-body mb-6">Rising prices have been on my mind recently, especially when I buy groceries or pay monthly bills. I like my housing, but I worry about whether it will stay affordable in the future. Small things cost more than they used to, and it adds quiet stress to everyday decisions. I wonder how people in other countries are coping with inflation and whether they feel the same pressure in their daily lives.</p>
          <p className="font-semibold float-right">Jan. 25, 2026</p>
        </div>
        <div className="bg-neutral-primary-soft block p-6 border border-default rounded-base shadow-xs transition-transform duration-200 hover:scale-105">
          <div className="flex justify-between">
            <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">Exercise</h5>
            <p className="text-body mb-6">24.3k reads</p>
          </div>
          <p className="text-body mb-6">I’ve been trying to exercise more consistently, even if it’s just a short walk or light workout. I like my housing because it’s close to a park, which makes it easier to get outside and move my body. Exercise helps clear my head, especially when I’ve been overthinking or spending too much time on my phone. It reminds me that health is something built from small, everyday habits.</p>
          <p className="font-semibold float-right">Jan. 24, 2026</p>
        </div>
      </div>
      <button type="button" className="mb-3 inline-flex items-center text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-base text-base px-6 py-3.5 focus:outline-none">
          See More
      </button>
    </main>
  );
}