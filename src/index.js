// Verificar imports no index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

console.log("Iniciando aplicação React"); // Log para debug

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);