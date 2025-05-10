// App.js - Com Firebase
import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import Alert from './components/Alert';
import CulturaSelector from './components/CulturaSelector';
import culturasData from './data/culturasData';
import { subscribeToSensorData } from './firebase/firebaseConfig';

function App() {
  const [sensorData, setSensorData] = useState({
    temperatura: 25.4,
    luminosidade: 850,
    umidade: 68
  });
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [culturaSelecionada, setCulturaSelecionada] = useState(null);
  
  // Definir limites padrão (serão substituídos pela cultura selecionada)
  const [limites, setLimites] = useState({
    temperatura: { min: 20, max: 40 },
    luminosidade: { min: 3000, max: 10000 },
    umidade: { min: 30, max: 75 }
  });

  // Função para lidar com a mudança de cultura
  const handleCulturaChange = (cultura) => {
    setCulturaSelecionada(cultura);
    setLimites(cultura.limites);
  };

  // Função para avaliar a qualidade do valor baseado nos níveis da cultura
  const getQualidadeValor = (tipo, valor) => {
    if (!culturaSelecionada) return 'Desconhecido';
    
    const niveis = culturaSelecionada.niveis[tipo];
    
    // Casos especiais para temperatura (valores ótimos podem ser menores que valores ruins)
    if (tipo === 'temperatura') {
      if (valor <= niveis.otimo) return 'Ótimo';
      if (valor <= niveis.bom) return 'Bom';
      if (valor <= niveis.regular) return 'Regular';
      return 'Ruim';
    }
    
    // Para umidade e luminosidade (valores ótimos são maiores que valores ruins)
    if (valor >= niveis.otimo) return 'Ótimo';
    if (valor >= niveis.bom) return 'Bom';
    if (valor >= niveis.regular) return 'Regular';
    return 'Ruim';
  };

  // Função para verificar condições e gerar alertas com base nos limites
  const checkConditionsAndCreateAlerts = (data) => {
    if (!culturaSelecionada) return;
    
    const newAlerts = [];
    
    // Classificar qualidade dos valores
    const qualidadeTemp = getQualidadeValor('temperatura', data.temperatura);
    const qualidadeLuz = getQualidadeValor('luminosidade', data.luminosidade);
    const qualidadeUmid = getQualidadeValor('umidade', data.umidade);
    
    // Gerar alertas apenas para Regular e Ruim
    if (qualidadeTemp === 'Ruim') {
      let mensagem = '';
      if (data.temperatura < culturaSelecionada.niveis.temperatura.otimo) {
        mensagem = `Alerta: Temperatura baixa (${data.temperatura}°C)! Ideal para ${culturaSelecionada.nome} é ${culturaSelecionada.niveis.temperatura.otimo}°C.`;
      } else {
        mensagem = `Alerta: Temperatura alta (${data.temperatura}°C)! Ideal para ${culturaSelecionada.nome} é ${culturaSelecionada.niveis.temperatura.otimo}°C.`;
      }
      
      newAlerts.push({
        id: 'temp-alert',
        type: 'danger',
        message: mensagem
      });
    } else if (qualidadeTemp === 'Regular') {
      newAlerts.push({
        id: 'temp-warning',
        type: 'warning',
        message: `Atenção: Temperatura em nível regular (${data.temperatura}°C). Ideal para ${culturaSelecionada.nome} é ${culturaSelecionada.niveis.temperatura.otimo}°C.`
      });
    }
    
    // Alertas para umidade
    if (qualidadeUmid === 'Ruim') {
      let mensagem = '';
      if (data.umidade < culturaSelecionada.niveis.umidade.regular) {
        mensagem = `Alerta: Umidade muito baixa (${data.umidade}%)! Ideal para ${culturaSelecionada.nome} é ${culturaSelecionada.niveis.umidade.otimo}%.`;
      } else {
        mensagem = `Alerta: Umidade muito alta (${data.umidade}%)! Ideal para ${culturaSelecionada.nome} é ${culturaSelecionada.niveis.umidade.otimo}%.`;
      }
      
      newAlerts.push({
        id: 'humidity-alert',
        type: 'danger',
        message: mensagem
      });
    } else if (qualidadeUmid === 'Regular') {
      newAlerts.push({
        id: 'humidity-warning',
        type: 'warning',
        message: `Atenção: Umidade em nível regular (${data.umidade}%). Ideal para ${culturaSelecionada.nome} é ${culturaSelecionada.niveis.umidade.otimo}%.`
      });
    }
    
    // Alertas para luminosidade
    if (qualidadeLuz === 'Ruim') {
      let mensagem = '';
      if (data.luminosidade < culturaSelecionada.niveis.luminosidade.regular) {
        mensagem = `Alerta: Luminosidade muito baixa (${data.luminosidade} lux)! Ideal para ${culturaSelecionada.nome} é ${culturaSelecionada.niveis.luminosidade.otimo} lux.`;
      } else {
        mensagem = `Alerta: Luminosidade muito alta (${data.luminosidade} lux)! Ideal para ${culturaSelecionada.nome} é ${culturaSelecionada.niveis.luminosidade.otimo} lux.`;
      }
      
      newAlerts.push({
        id: 'light-alert',
        type: 'danger',
        message: mensagem
      });
    } else if (qualidadeLuz === 'Regular') {
      newAlerts.push({
        id: 'light-warning',
        type: 'warning',
        message: `Atenção: Luminosidade em nível regular (${data.luminosidade} lux). Ideal para ${culturaSelecionada.nome} é ${culturaSelecionada.niveis.luminosidade.otimo} lux.`
      });
    }
    
    setAlerts(newAlerts);
  };

  // Toggle simples do tema
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Definir a primeira cultura como padrão
    if (culturasData.length > 0 && !culturaSelecionada) {
      handleCulturaChange(culturasData[0]);
    }
    
    // Conectar ao Firebase e inscrever-se para receber atualizações
    const unsubscribe = subscribeToSensorData((data) => {
      console.log("Dados recebidos do Firebase:", data);
      setSensorData(data);
      setLoading(false);
      
      // Verificar condições após receber novos dados
      if (culturaSelecionada) {
        checkConditionsAndCreateAlerts(data);
      }
    });

    // Verificar condições iniciais
    if (culturaSelecionada) {
      checkConditionsAndCreateAlerts(sensorData);
    }

    // Função de limpeza para desinscrever quando o componente for desmontado
    return () => {
      unsubscribe();
    };
  }, [culturaSelecionada]); // Reexecutar quando a cultura mudar

  const teamMembers = [
    'Ana',
    'Evelin',
    'Hobedes',
    'Jaqueline',
    'Moacir',
    'Pedro',
    'Thiago'
  ];

  // Classe condicional para o tema escuro
  const appClassName = `app ${darkMode ? 'dark-mode' : ''}`;

  return (
    <div className={appClassName}>
      <Header darkMode={darkMode} />
      
      <main className="main-content">
        {/* Seletor de Cultura */}
        <CulturaSelector 
          culturaSelecionada={culturaSelecionada}
          onCulturaChange={handleCulturaChange}
          darkMode={darkMode}
        />
        
        {/* Exibir alertas */}
        <div className="alerts-container">
          {alerts.map(alert => (
            <Alert 
              key={alert.id}
              type={alert.type}
              message={alert.message}
            />
          ))}
        </div>

        {loading ? (
          <div className="loading">Conectando ao Firebase e carregando dados dos sensores...</div>
        ) : (
          <Dashboard 
            data={sensorData} 
            darkMode={darkMode} 
            limites={limites}
            culturaSelecionada={culturaSelecionada}
          />
        )}
      </main>
      <Footer 
        members={teamMembers} 
        darkMode={darkMode} 
        toggleTheme={toggleTheme} 
      />
    </div>
  );
}

export default App;