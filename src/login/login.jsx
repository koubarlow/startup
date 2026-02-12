import React from 'react';

export function Login() {
  return (
    <main className="container-fluid bg-secondary text-center">
      <div class="loginCard">
        <h2>Login</h2>
        <form method="get" action="explore.html">
          <input name="email" type="text" placeholder="your@email.com" />
          <input name="password" type="password" placeholder="password" />
          <button type="submit">Login</button>
          <a href="signup.html">Sign Up</a>
        </form>
      </div>
    </main>
  );
}