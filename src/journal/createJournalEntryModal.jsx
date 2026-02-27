import React, { useEffect, useState } from "react";

export function CreateJournalEntryModal({setShowCreateJournalEntryModal, createEntry}) {

    const [topic, setTopic] = React.useState("");
    const [entry, setEntry] = React.useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    function toggle() {
        setShowCreateJournalEntryModal(prev => !prev);
    }

    function createNewEntry() {
        createEntry(topic, entry);
        toggle();
    }
    return (
        <div id="crud-modal" tabIndex="-1" className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 p-4">
            <div className="relative p-4 w-full max-w-md max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-neutral-primary-soft border border-default rounded-base shadow-sm p-4 md:p-6">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between border-b border-default pb-4 md:pb-5">
                        <h3 className="text-lg font-medium text-heading">
                            New Entry
                        </h3>
                        <button type="button" className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center" data-modal-hide="crud-modal">
                            <svg onClick={toggle} className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 grid-cols-2 py-4 md:py-6">
                            <div className="col-span-2">
                                <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Topic</label>
                                <input onChange={(e) => setTopic(e.target.value)} type="text" name="name" id="name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="School, New TV, Soccer, etc." required=""/>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="description" className="block mb-2.5 text-sm font-medium text-heading">Entry</label>
                                <textarea onChange={(e) => setEntry(e.target.value)} id="description" rows="4" className="block bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" placeholder="I recently started a new semester at school..."></textarea>                    
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 border-t border-default pt-4 md:pt-6">
                            <button onClick={createNewEntry} type="submit" className="inline-flex items-center  text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                <svg className="w-4 h-4 me-1.5 -ms-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/></svg>
                                Create
                            </button>
                            <button onClick={toggle} data-modal-hide="crud-modal" type="button" className="text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Cancel</button>
                        </div>
                    </form>        
                </div>
            </div>
        </div> 
    )
}