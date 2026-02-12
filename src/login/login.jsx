import React from 'react';
import { SignUp } from '../signup/signup';
import { useNavigate } from "react-router-dom";


export function Login() {
  const navigate = useNavigate();
  return (
    <main>
      <div class="loginCard">
        <h2>Login</h2>
        <form method="get" action="explore.html">
          <input name="email" type="text" placeholder="your@email.com" />
          <input name="password" type="password" placeholder="password" />
          <button type="submit">Login</button>
          <a href="/signup">Sign Up</a>
        </form>
      </div>
    </main>
  );
}