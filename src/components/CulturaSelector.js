// components/CulturaSelector.js
import React, { useState } from 'react';
import './CulturaSelector.css';
import culturasData from '../data/culturasData';

const CulturaSelector = ({ culturaSelecionada, onCulturaChange, darkMode }) => {
  // Estado para controlar a visualização expandida dos detalhes
  const [detalhesExpandidos, setDetalhesExpandidos] = useState(false);

  const toggleDetalhes = () => {
    setDetalhesExpandidos(!detalhesExpandidos);
  };

  return (
    <div className={`cultura-selector ${darkMode ? 'dark-mode' : ''}`}>
      <div className="cultura-selector-header">
        <h3>Selecione uma Cultura</h3>
        <span className="cultura-info">Ajusta automaticamente os limites dos sensores</span>
      </div>

      <div className="cultura-buttons">
        {culturasData.map(cultura => (
          <button
            key={cultura.id}
            className={`cultura-button ${culturaSelecionada?.id === cultura.id ? 'active' : ''}`}
            onClick={() => onCulturaChange(cultura)}
          >
            {cultura.nome}
          </button>
        ))}
      </div>

      {culturaSelecionada && (
        <div className="cultura-details">
          <div className="cultura-details-header">
            <h4>{culturaSelecionada.nome}</h4>
            <button 
              className="toggle-details-button" 
              onClick={toggleDetalhes}
              aria-label={detalhesExpandidos ? "Ocultar detalhes" : "Mostrar detalhes"}
            >
              {detalhesExpandidos ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
                </svg>
              )}
              {detalhesExpandidos ? "Ocultar Detalhes" : "Mostrar Detalhes"}
            </button>
          </div>
          
          <p>{culturaSelecionada.descricao}</p>
          
          <div className="limites-resumo">
            <div className="limite-item">
              <span className="limite-label">Temperatura:</span>
              <span className="limite-value">
                {culturaSelecionada.limites.temperatura.min}°C - {culturaSelecionada.limites.temperatura.max}°C
              </span>
            </div>
            <div className="limite-item">
              <span className="limite-label">Luminosidade:</span>
              <span className="limite-value">
                {culturaSelecionada.limites.luminosidade.min} - {culturaSelecionada.limites.luminosidade.max} lux
              </span>
            </div>
            <div className="limite-item">
              <span className="limite-label">Umidade:</span>
              <span className="limite-value">
                {culturaSelecionada.limites.umidade.min}% - {culturaSelecionada.limites.umidade.max}%
              </span>
            </div>
          </div>
          
          {detalhesExpandidos && (
            <div className="niveis-container">
              <h5>Níveis Detalhados</h5>
              
              <div className="niveis-tabela">
                <div className="niveis-cabecalho">
                  <div className="nivei-celula"></div>
                  <div className="nivel-celula nivel-otimo">Ótimo</div>
                  <div className="nivel-celula nivel-bom">Bom</div>
                  <div className="nivel-celula nivel-regular">Regular</div>
                  <div className="nivel-celula nivel-ruim">Ruim</div>
                </div>
                
                <div className="niveis-linha">
                  <div className="nivel-celula nivel-titulo">Temperatura (°C)</div>
                  <div className="nivel-celula nivel-otimo">{culturaSelecionada.niveis.temperatura.otimo}</div>
                  <div className="nivel-celula nivel-bom">{culturaSelecionada.niveis.temperatura.bom}</div>
                  <div className="nivel-celula nivel-regular">{culturaSelecionada.niveis.temperatura.regular}</div>
                  <div className="nivel-celula nivel-ruim">{culturaSelecionada.niveis.temperatura.ruim}</div>
                </div>
                
                <div className="niveis-linha">
                  <div className="nivel-celula nivel-titulo">Luminosidade (lux)</div>
                  <div className="nivel-celula nivel-otimo">{culturaSelecionada.niveis.luminosidade.otimo}</div>
                  <div className="nivel-celula nivel-bom">{culturaSelecionada.niveis.luminosidade.bom}</div>
                  <div className="nivel-celula nivel-regular">{culturaSelecionada.niveis.luminosidade.regular}</div>
                  <div className="nivel-celula nivel-ruim">{culturaSelecionada.niveis.luminosidade.ruim}</div>
                </div>
                
                <div className="niveis-linha">
                  <div className="nivel-celula nivel-titulo">Umidade (%)</div>
                  <div className="nivel-celula nivel-otimo">{culturaSelecionada.niveis.umidade.otimo}</div>
                  <div className="nivel-celula nivel-bom">{culturaSelecionada.niveis.umidade.bom}</div>
                  <div className="nivel-celula nivel-regular">{culturaSelecionada.niveis.umidade.regular}</div>
                  <div className="nivel-celula nivel-ruim">{culturaSelecionada.niveis.umidade.ruim}</div>
                </div>
              </div>
              
              <div className="niveis-legenda">
                <div className="legenda-item legenda-otimo">Ótimo</div>
                <div className="legenda-item legenda-bom">Bom</div>
                <div className="legenda-item legenda-regular">Regular</div>
                <div className="legenda-item legenda-ruim">Ruim</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CulturaSelector;