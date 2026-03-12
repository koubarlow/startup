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

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  async function loginUser() {
    if (!validateEmail(email)) {
      setDisplayError("Invalid email format");
      return;
    }
    let loginBody = JSON.stringify({ 'email': email, 'password': password });
    const response = await fetch('/api/auth/login', {
      method: 'post',
      body: loginBody,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      }
    });

    if (response?.status === 200) {
      const data = await response.json();
      onLogin(data.user);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  function onLogin(user) {
    localStorage.setItem('username', user.username);
    localStorage.setItem('currentUserId', user.userId)
    onAuthChange(user.username, user.userId, AuthState.Authenticated);
    navigate('/explore');
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