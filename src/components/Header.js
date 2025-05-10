// components/Header.js
import React from 'react';
import './Header.css';
import agropop_logo from '../assets/agropop_logo.png'; // Importamos a imagem do logo

const Header = ({ darkMode }) => {
  return (
    <header className={`header ${darkMode ? 'dark-mode' : ''}`}>
      <div className="logo-container">
        <img src={agropop_logo} alt="AGROPOP" className="header-logo" />
      </div>
    </header>
  );
};

export default Header;