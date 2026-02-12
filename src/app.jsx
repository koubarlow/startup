import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Explore } from './explore/explore';
import { Journal } from './journal/journal';
import { Home } from './home/home';
import { SignUp } from './signup/signup';

export default function App() {
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
                        <li className="navbar-item">
                            <NavLink className="nav-link" to="explore">Explore</NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink className="nav-link" to="journal">My Journal</NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink className="nav-link" to="login">Login</NavLink>
                        </li>
                    </menu>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Home />} exact />
                <Route path='/home' element={<Home />} />
                <Route path='/explore' element={<Explore />} />
                <Route path='/journal' element={<Journal />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer>
                <span class="text-black">Kou Barlow</span>
                <a href="https://github.com/koubarlow/startup">GitHub</a>
            </footer>
        </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
}