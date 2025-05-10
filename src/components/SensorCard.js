// components/SensorCard.js com níveis de qualidade
import React from 'react';
import './SensorCard.css';

const SensorCard = ({ 
  title, 
  value, 
  unit, 
  icon, 
  color, 
  qualidadeNivel, 
  qualidadeMensagem,
  limites,
  niveis,
  darkMode 
}) => {
  // Ícones simples para cada tipo de sensor
  const getIcon = (iconType) => {
    switch (iconType) {
      case 'temperature':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
            <path d="M12,3C10.9,3 10,3.9 10,5V14.1C9.2,14.6 8.8,15.5 9,16.4C9.2,17.4 10,18.2 11,18.4C11.9,18.6 12.9,18.2 13.4,17.4C13.8,16.8 13.9,16 13.6,15.3C13.4,14.6 12.8,14.1 12,13.9V5C12,4.4 11.6,4 11,4S10,4.4 10,5V12L9.4,11.4C9,11 8.4,11 8,11.4C7.6,11.8 7.6,12.4 8,12.8L10.1,14.9C10,15 10,15.1 10,15.3C10,16.3 10.8,17 11.8,17C12.8,17 13.6,16.2 13.6,15.2C13.6,14.5 13.1,13.8 12.4,13.5V5C12.4,4.7 12.2,4.4 12,4.4C11.8,4.4 11.6,4.7 11.6,5V13.5C10.9,13.8 10.4,14.5 10.4,15.2C10.4,15.9 10.9,16.5 11.5,16.6C12.1,16.8 12.8,16.4 13,15.9C13.2,15.5 13.2,15 13,14.6C12.9,14.4 12.7,14.2 12.4,14.1V5C12.4,4.4 12,4 11.4,4C10.9,4 10.4,4.4 10.4,5V12L9.9,11.4C9.5,11 8.9,11 8.5,11.4C8,11.8 8,12.4 8.5,12.9L10.5,14.9C10.4,15 10.3,15.1 10.3,15.2C10.3,15.6 10.7,16 11.1,16C11.5,16 11.9,15.6 11.9,15.2C11.9,15 11.8,14.8 11.6,14.6V5C11.6,3.9 10.7,3 9.6,3H9.5C8.4,3 7.5,3.9 7.5,5V12.5C7.5,13.9 8.1,15.2 9.2,16.1L9.6,16.4C10.3,17 11.1,17.3 12,17.3C12.9,17.3 13.7,17 14.4,16.4L14.8,16.1C15.9,15.2 16.5,13.9 16.5,12.5V5C16.5,3.9 15.6,3 14.5,3H14.4C13.3,3 12.4,3.9 12.4,5V9.2C12.4,9.7 12.7,10 13.2,10C13.7,10 14,9.7 14,9.2V5C14,4.4 14.4,4 15,4C15.6,4 16,4.4 16,5V12C16,14.2 14.2,16 12,16C9.8,16 8,14.2 8,12V5C8,4.5 8.5,4 9,4C9.5,4 10,4.5 10,5"/>
          </svg>
        );
      case 'light':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
            <path d="M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" />
          </svg>
        );
      case 'humidity':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
            <path d="M12,3.25C12,3.25 6,10 6,14C6,17.32 8.69,20 12,20A6,6 0 0,0 18,14C18,10 12,3.25 12,3.25M14.47,9.97L15.53,11.03L9.53,17.03L8.47,15.97M9.75,10A1.25,1.25 0 0,1 11,11.25A1.25,1.25 0 0,1 9.75,12.5A1.25,1.25 0 0,1 8.5,11.25A1.25,1.25 0 0,1 9.75,10M14.25,14.5A1.25,1.25 0 0,1 15.5,15.75A1.25,1.25 0 0,1 14.25,17A1.25,1.25 0 0,1 13,15.75A1.25,1.25 0 0,1 14.25,14.5Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Determinar a classe CSS com base no nível de qualidade
  let cardClass = 'sensor-card';
  if (darkMode) cardClass += ' dark-mode';
  
  if (qualidadeNivel) {
    cardClass += ` quality-${qualidadeNivel}`;
  }

  // Definir a cor baseada no modo escuro
  const displayColor = darkMode ? getBrighterColor(color) : color;

  // Função para deixar a cor mais brilhante para o modo escuro
  function getBrighterColor(hexColor) {
    // Se já for um tom claro, apenas retorna
    if (hexColor === '#FFC300' || hexColor === '#33A1FF') {
      return hexColor;
    }
    // Se for vermelho, retornar um tom mais claro
    if (hexColor === '#FF5733') {
      return '#FF7E62';
    }
    return hexColor;
  }

  // Determinar o ícone e a classe do indicador de qualidade
  const getQualidadeIcon = (nivel) => {
    if (nivel === 'ruim' || nivel === 'regular') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>
      );
    } else if (nivel === 'otimo' || nivel === 'bom') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      );
    }
    return null;
  };

  // Calcular a porcentagem para a barra de progresso
  const calculateProgress = () => {
    if (!limites) return 0;
    
    const min = limites.min;
    const max = limites.max;
    const range = max - min;
    
    // Limitar o valor dentro do intervalo min-max para a visualização
    const limitedValue = Math.max(min, Math.min(max, value));
    
    // Calcular a porcentagem
    return ((limitedValue - min) / range) * 100;
  };

  // Gerar marcadores para os níveis na barra de progresso
  const renderNivelMarkers = () => {
    if (!niveis) return null;
    
    const markers = [];
    const { min, max } = limites;
    const range = max - min;
    
    // Para cada nível, calcular a posição na barra
    // Para temperatura, menor é melhor, então a ordem é contrária
    if (title === "Temperatura") {
      // Temperatura: ótimo < bom < regular < ruim
      const otimoPos = ((niveis.otimo - min) / range) * 100;
      const bomPos = ((niveis.bom - min) / range) * 100;
      const regularPos = ((niveis.regular - min) / range) * 100;
      
      markers.push(
        <div key="otimo" className="nivel-marker nivel-otimo" style={{ left: `${otimoPos}%` }} title="Ótimo"></div>,
        <div key="bom" className="nivel-marker nivel-bom" style={{ left: `${bomPos}%` }} title="Bom"></div>,
        <div key="regular" className="nivel-marker nivel-regular" style={{ left: `${regularPos}%` }} title="Regular"></div>
      );
    } else {
      // Luminosidade e Umidade: ótimo > bom > regular > ruim
      const otimoPos = ((niveis.otimo - min) / range) * 100;
      const bomPos = ((niveis.bom - min) / range) * 100;
      const regularPos = ((niveis.regular - min) / range) * 100;
      
      markers.push(
        <div key="otimo" className="nivel-marker nivel-otimo" style={{ left: `${otimoPos}%` }} title="Ótimo"></div>,
        <div key="bom" className="nivel-marker nivel-bom" style={{ left: `${bomPos}%` }} title="Bom"></div>,
        <div key="regular" className="nivel-marker nivel-regular" style={{ left: `${regularPos}%` }} title="Regular"></div>
      );
    }
    
    return markers;
  };

  return (
    <div className={cardClass} style={{ borderColor: displayColor }}>
      <div className="sensor-icon" style={{ color: displayColor }}>
        {getIcon(icon)}
      </div>
      <div className="sensor-info">
        <h2>{title}</h2>
        <div className="sensor-value" style={{ color: displayColor }}>
          <span className="value">{value}</span>
          <span className="unit">{unit}</span>
        </div>
        
        {/* Indicador de qualidade */}
        {qualidadeNivel !== 'none' && qualidadeMensagem && (
          <div className={`quality-indicator quality-${qualidadeNivel}`}>
            {getQualidadeIcon(qualidadeNivel)}
            <span>{qualidadeMensagem}</span>
          </div>
        )}
        
        {/* Barra de progresso com limites e marcadores de níveis */}
        {limites && (
          <div className="limites-progress">
            <div className="limites-range">
              <span className="min-value">{limites.min}{unit}</span>
              <span className="max-value">{limites.max}{unit}</span>
            </div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}></div>
              {niveis && renderNivelMarkers()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SensorCard;