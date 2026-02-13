import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <div class="welcomeDisplay mb-6">
        <h1>Tomodachi</h1>
        <h3>Discover what other countries are really like through Journal Sharing</h3>
      </div>
      <button onClick={() => navigate('/signup')} class="mt-8 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-[calc(var(--radius-base)-2px)] group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white">
        <span class="relative px-8 py-3 transition-all ease-in duration-75 bg-neutral-primary-soft rounded-[calc(var(--radius-base)-2px)] group-hover:bg-transparent group-hover:dark:bg-transparent leading-5">
        Get Started
        </span>
      </button>
      <div class="numberOfUsersDisplay">
        <div>
          <img src="assets/US.svg" alt="US Flag"/>
          <h2 class="mt-4">100,106</h2>
          <p>Native English Users</p>
        </div>
        <div>
          <img src="assets/JP.svg" alt="Japan Flag"/>
          <h2 class="mt-4">95,004</h2>
          <p>Native Japanese Users</p>
        </div>
      </div>
    </main>
  );
}