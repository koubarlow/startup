import React from 'react';
import { useNavigate } from "react-router-dom";
import { AuthState } from './authState';
import { MessageDialog } from './messageDialog';


export function Login({ onAuthChange }) {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  async function loginUser() {
    // let username = localStorage.getItem(email);
    // if (!username) {
    //   setDisplayError("Incorrect email or password");
    //   return;
    // }
    onAuthChange(email, AuthState.Authenticated);
    navigate('/');
  }

  return (
    <main>
      <div className="loginCard">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input name="email" type="text" onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
          <input name="password" type="password" onChange={(p) => setPassword(p.target.value)} placeholder="password" />
          <button className="login-button" type="submit" onClick={() => loginUser()} disabled={!email || !password}>Login</button>
          <a href="/signup">Sign Up</a>
        </form>
      </div>
      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </main>
  );
}