// components/Alert.js
import React, { useState, useEffect } from 'react';
import './Alert.css';

const Alert = ({ type, message }) => {
  const [visible, setVisible] = useState(true);

  // Adicionar opção para fechar o alerta
  const closeAlert = () => {
    setVisible(false);
  };

  // Efeito para animação de entrada
  useEffect(() => {
    setVisible(true);
  }, [message]);

  if (!visible) return null;

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-content">
        {type === 'danger' && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        )}
        {type === 'warning' && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
        )}
        <span>{message}</span>
      </div>
      <button className="alert-close" onClick={closeAlert}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  );
};

export default Alert;