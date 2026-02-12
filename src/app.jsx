import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './explore/explore';
import { Scores } from './journal/journal';
import { About } from './home/home';

export default function App() {
  return (
    <BrowserRouter>
        <div className="body bg-dark text-light">
            <header>
                <nav>
                    <menu>
                    <img src="assets/tomodachi-logo-small.png" alt="Tomodachi Logo"/>
                    <li><NavLink to="home" class="active">Tomodachi</NavLink></li>
                    <li><NavLink to="explore">Explore</NavLink></li>
                    <li><NavLink to="journal">My Journal</NavLink></li>
                    <li><NavLink to="login">Login</NavLink></li>
                    </menu>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Home />} exact />
                <Route path='/explore' element={<Explore />} />
                <Route path='/journal' element={<Journal />} />
                <Route path='/Login' element={<Login />} />
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