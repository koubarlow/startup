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
  const [currentUserId, setCurrentUserId] = React.useState(localStorage.getItem('currentUserId') || '');
  const [username, setUsername] = React.useState(localStorage.getItem('username') || '');
  const currentAuthState = username ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
    .catch((error) => {
        // Logout failed. Assuming offline
        console.log(error);
        return;
    })
    
    localStorage.removeItem('username');
    localStorage.removeItem('currentUserId');
    setAuthState(AuthState.Unauthenticated);
    setUsername(username);
    setCurrentUserId(currentUserId);
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
                            <NavLink className="nav-link" to="" onClick={() => logout()} >Logout</NavLink>
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
                <Route path='/explore' element={
                    <Explore 
                        onAuthChange={(username, currentUserId, authState) => {
                            setAuthState(authState);
                            setUsername(username);
                            setCurrentUserId(currentUserId);
                        }}
                    />
                    } />
                <Route path='/journal' element={
                    <Journal 
                        userId={currentUserId}
                        onAuthChange={(username, currentUserId, authState) => {
                            setAuthState(authState);
                            setUsername(username);
                            setCurrentUserId(currentUserId);
                        }}
                    />
                    } />
                <Route path='/login' element={
                    <Login
                        onAuthChange={(username, currentUserId, authState) => {
                            setAuthState(authState);
                            setUsername(username);
                            setCurrentUserId(currentUserId);
                        }}
                    />
                    } />
                <Route path='/signup' element={
                    <SignUp 
                        onAuthChange={(username, currentUserId, authState) => {
                            setAuthState(authState);
                            setUsername(username);
                            setCurrentUserId(currentUserId)
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