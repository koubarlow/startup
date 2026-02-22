import React from 'react';
import { SignUp } from '../signup/signup';
import { useNavigate } from "react-router-dom";


export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('email', email)
  }

  return (
    <main>
      <div class="loginCard">
        <h2>Login</h2>
        <form method="get" action="explore">
          <input name="email" type="text" onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
          <input name="password" type="password" onChange={(p) => setPassword(p.target.value)} placeholder="password" />
          <button class="login-button" type="submit" onClick={() => loginUser()} disabled={!email || !password}>Login</button>
          <a href="/signup">Sign Up</a>
        </form>
      </div>
    </main>
  );
}