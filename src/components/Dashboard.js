// components/Dashboard.js com níveis de qualidade
import React from 'react';
import SensorCard from './SensorCard';
import './Dashboard.css';

const Dashboard = ({ data, darkMode, limites, culturaSelecionada }) => {
  // Função para avaliar a qualidade do valor baseado nos níveis da cultura
  const getQualidade = (tipo, valor) => {
    if (!culturaSelecionada) return { nivel: 'none', mensagem: null };
    
    const niveis = culturaSelecionada.niveis[tipo];
    
    // Casos especiais para temperatura (valores ótimos podem ser menores que valores ruins)
    if (tipo === 'temperatura') {
      if (valor <= niveis.otimo) return { nivel: 'otimo', mensagem: 'Temperatura ótima' };
      if (valor <= niveis.bom) return { nivel: 'bom', mensagem: 'Temperatura boa' };
      if (valor <= niveis.regular) return { nivel: 'regular', mensagem: 'Temperatura regular' };
      return { nivel: 'ruim', mensagem: 'Temperatura ruim' };
    }
    
    // Para umidade e luminosidade (valores ótimos são maiores que valores ruins)
    if (valor >= niveis.otimo) return { nivel: 'otimo', mensagem: `${tipo === 'umidade' ? 'Umidade ótima' : 'Luminosidade ótima'}` };
    if (valor >= niveis.bom) return { nivel: 'bom', mensagem: `${tipo === 'umidade' ? 'Umidade boa' : 'Luminosidade boa'}` };
    if (valor >= niveis.regular) return { nivel: 'regular', mensagem: `${tipo === 'umidade' ? 'Umidade regular' : 'Luminosidade regular'}` };
    return { nivel: 'ruim', mensagem: `${tipo === 'umidade' ? 'Umidade ruim' : 'Luminosidade ruim'}` };
  };

  // Determinar qualidade para cada sensor
  const temperaturaQualidade = culturaSelecionada ? getQualidade('temperatura', data.temperatura) : { nivel: 'none', mensagem: null };
  const luminosidadeQualidade = culturaSelecionada ? getQualidade('luminosidade', data.luminosidade) : { nivel: 'none', mensagem: null };
  const umidadeQualidade = culturaSelecionada ? getQualidade('umidade', data.umidade) : { nivel: 'none', mensagem: null };

  return (
    <div className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>      
      <div className="dashboard-grid">
        <SensorCard 
          title="Temperatura" 
          value={data.temperatura} 
          unit="°C" 
          icon="temperature"
          color="#FF5733"
          qualidadeNivel={temperaturaQualidade.nivel}
          qualidadeMensagem={temperaturaQualidade.mensagem}
          limites={limites.temperatura}
          niveis={culturaSelecionada?.niveis.temperatura}
          darkMode={darkMode}
        />
        <SensorCard 
          title="Luminosidade" 
          value={data.luminosidade} 
          unit="lux" 
          icon="light"
          color="#FFC300"
          qualidadeNivel={luminosidadeQualidade.nivel}
          qualidadeMensagem={luminosidadeQualidade.mensagem}
          limites={limites.luminosidade}
          niveis={culturaSelecionada?.niveis.luminosidade}
          darkMode={darkMode}
        />
        <SensorCard 
          title="Umidade" 
          value={data.umidade} 
          unit="%" 
          icon="humidity"
          color="#33A1FF"
          qualidadeNivel={umidadeQualidade.nivel}
          qualidadeMensagem={umidadeQualidade.mensagem}
          limites={limites.umidade}
          niveis={culturaSelecionada?.niveis.umidade}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default Dashboard;