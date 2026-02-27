import React from "react";

export function MyNotification({notification, dismissNotification}) {
    return (
    <div id="alert-1" className="flex sm:items-center p-4 mb-1 text-sm text-fg-brand-strong rounded-base bg-brand-soft color-brand-100" role="alert">
        <svg className="w-4 h-4 shrink-0 mt-0.5 md:mt-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
        <span className="sr-only">Info</span>
        <div className="ms-2 text-sm">
        10:39am GMT+9: くりさん read your Jan. 26 journal
        </div>
        <button type="button" className="ms-auto -mx-1.5 -my-1.5 rounded focus:ring-2 focus:ring-brand-medium hover:bg-brand-200 inline-flex items-center justify-center h-8 w-8 shrink-0 shrink-0" data-dismiss-target="#alert-1" aria-label="Close">
            <span className="sr-only">Close</span>
            {/* onClick={dismissNotification(notification.notificationId)} */}
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
        </button>
    </div>
    );
}