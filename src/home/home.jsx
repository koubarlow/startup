import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../login/authState';

export function Home({ username, authState }) {
  const navigate = useNavigate();
  const [englishCount, setEnglishCount] = React.useState(0);
  const [japaneseCount, setJapaneseCount] = React.useState(0);

  async function fetchUserCounts() {
    try {
      const res = await fetch(`/api/userCount`);
      if (!res.ok) {
        throw new Error('Failed to fetch userCount');
      }
      const userCount = await res.json();
      setEnglishCount(userCount.englishCount);
      setJapaneseCount(userCount.japaneseCount);
    } catch (e) {
      console.error(e);
    }
  }

  React.useEffect(() => {
    fetchUserCounts();
  }, []);

  return (
    <main>
      <div className="welcomeDisplay mb-6">
        <h1>Tomodachi</h1>
        {authState === AuthState.Unauthenticated && (
          <h3>Discover what other countries are really like through Journal Sharing</h3>
        )}
        {authState === AuthState.Authenticated && (
          <h3>Welcome, {username}.</h3>
        )}
      </div>

      {authState === AuthState.Unauthenticated && (
        <button onClick={() => navigate('/signup')} className="mt-8 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-[calc(var(--radius-base)-2px)] group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white">
          <span className="relative px-8 py-3 transition-all ease-in duration-75 rounded-[calc(var(--radius-base)-2px)] leading-5">
          Get Started
          </span>
        </button>
      )}
      {authState === AuthState.Authenticated && (
          <button onClick={() => navigate('/journal')} className="mt-8 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-[calc(var(--radius-base)-2px)] group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white">
            <span className="relative px-8 py-3 transition-all ease-in duration-75 rounded-[calc(var(--radius-base)-2px)] leading-5">
            Create Journal Entry
            </span>
          </button>
      )}

      <div className="numberOfUsersDisplay">
        <div>
          <img src="assets/US.svg" alt="US Flag"/>
          <h2 className="mt-4">{englishCount}</h2>
          <p>Native English Users</p>
        </div>
        <div>
          <img src="assets/JP.svg" alt="Japan Flag"/>
          <h2 className="mt-4">{japaneseCount}</h2>
          <p>Native Japanese Users</p>
        </div>
      </div>
    </main>
  );
}