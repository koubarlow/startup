import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (
    <div className="body bg-dark text-light">
      <header>
        <nav>
            <menu>
            <img src="assets/tomodachi-logo-small.png" alt="Tomodachi Logo"/>
            <li><a href="index.html" class="active">Tomodachi</a></li>
            <li><a href="explore.html">Explore</a></li>
            <li><a href="myjournal.html">My Journal</a></li>
            <li><a href="login.html">Login</a></li>
            </menu>
        </nav>
      </header>

      <main>App components go here</main>

        <footer>
            <span class="text-black">Kou Barlow</span>
            <a href="https://github.com/koubarlow/startup">GitHub</a>
        </footer>
    </div>
  );
}