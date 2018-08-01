import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../logo.svg';

const Header = () => (
    <div className="App">
        <div className="container">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <ul>
                <li>
                    <Link to="/">Ingresar al Sistema</Link>
                </li>
                <li>
                    <Link to="../register">Registrese Para Ingresar al Sistema</Link>
                </li>
            </ul>
        </div>
    </div>
);

export default Header