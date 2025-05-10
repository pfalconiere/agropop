// components/Footer.js
import React from 'react';
import './Footer.css';
import ThemeToggle from './ThemeToggle';

const Footer = ({ members, darkMode, toggleTheme }) => {
  return (
    <footer className={`footer ${darkMode ? 'dark-mode' : ''}`}>
      <div className="footer-content">
        <div className="team-members">
          <h3>Integrantes do Grupo</h3>
          <ul>
            {members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
        
        <div className="footer-right">
          <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} AGROPOP. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;