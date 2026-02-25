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
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  function logout() {
    localStorage.removeItem('userName');
    setAuthState(AuthState.Unauthenticated);
    setUserName(userName);
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
                    userName={userName}
                    authState={authState}
                    />
                    } exact />
                <Route path='/explore' element={<Explore />} />
                <Route path='/journal' element={<Journal />} />
                <Route path='/login' element={
                    <Login
                    onAuthChange={(userName, authState) => {
                        setAuthState(authState);
                        setUserName(userName);
                    }}
                    />
                    } />
                <Route path='/signup' element={
                    <SignUp 
                    onAuthChange={(userName, authState) => {
                        setAuthState(authState);
                        setUserName(userName);
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