import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Explore } from './explore/explore';
import { Journal } from './journal/journal';
import { Home } from './home/home';
import { SignUp } from './signup/signup';
import { AuthState } from './login/authState';

function App() {
  const [username, setUsername] = React.useState(localStorage.getItem('username') || '');
  const currentAuthState = username ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  function logout() {
    localStorage.removeItem('username');
    setAuthState(AuthState.Unauthenticated);
    setUsername(username);
  }

  function getUserData(email) {
    var userJson = localStorage.getItem(email);
    var user = JSON.parse(userJson);
    setUsername(user.username)
  }

  return (
    <BrowserRouter>
        <div className="body">
            <header>
                <nav>
                    <menu>
                        <img src="assets/tomodachi-logo-small.png" alt="Tomodachi Logo"/>
                        <li className="navbar-item">
                            <NavLink className="nav-link active" to="">Tomodachi</NavLink>
                        </li>
                        {authState === AuthState.Authenticated && (
                        <li className="navbar-item">
                            <NavLink className="nav-link" to="explore">Explore</NavLink>
                        </li>
                        )}
                        {authState === AuthState.Authenticated && (
                        <li className="navbar-item">
                            <NavLink className="nav-link" to="journal">My Journal</NavLink>
                        </li>
                        )}
                        {authState === AuthState.Unauthenticated && (
                        <li className="navbar-item">
                            <NavLink className="nav-link" to="login">Login</NavLink>
                        </li>
                        )}
                        {authState === AuthState.Authenticated && (
                        <li className="navbar-item">
                            <button onClick={() => logout()} >Logout</button>
                        </li>
                        )}
                    </menu>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={
                    <Home 
                    username={username}
                    authState={authState}
                    />
                    } exact />
                <Route path='/explore' element={<Explore />} />
                <Route path='/journal' element={<Journal />} />
                <Route path='/login' element={
                    <Login
                    onAuthChange={(email, authState) => {
                        setAuthState(authState);
                        getUserData(email);
                    }}
                    />
                    } />
                <Route path='/signup' element={
                    <SignUp 
                    onAuthChange={(email, authState) => {
                        setAuthState(authState);
                        getUserData(email);
                    }}
                    />} 
                    />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>
                <span className="text-black">Kou Barlow</span>
                <a href="https://github.com/koubarlow/startup">GitHub</a>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}

export default App;