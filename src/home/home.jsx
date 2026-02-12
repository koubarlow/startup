import React from 'react';

export function Home() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div class="welcomeDisplay">
        <h1>Tomodachi</h1>
        <h3>Discover what other countries are really like through Journal Sharing</h3>
      </div>
      <button>Get Started</button>
      <div class="numberOfUsersDisplay">
        <div>
          <img src="assets/US.svg" alt="US Flag"/>
          <h2>100,106</h2>
          <p>Native English Users</p>
        </div>
        <div>
          <img src="assets/JP.svg" alt="Japan Flag"/>
          <h2>95,004</h2>
          <p>Native Japanese Users</p>
        </div>
      </div>
    </main>
  );
}