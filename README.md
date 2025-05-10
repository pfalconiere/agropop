# AGROPOP - Sistema de Monitoramento Agrícola

<div align="center">
  <img src="src/assets/agropop_logo.png" alt="AGROPOP Logo" width="300"/>
  <br/>
  <p><strong>Monitoramento de culturas em tempo real</strong></p>
</div>

## 📋 Sobre o Projeto

AGROPOP é um sistema de monitoramento agrícola em tempo real que utiliza sensores IoT para coletar dados de temperatura, umidade e luminosidade em diferentes tipos de culturas. O sistema permite visualizar os dados em um dashboard responsivo e fornece alertas baseados em parâmetros ideais para cada tipo de cultura.

### 🌟 Principais Funcionalidades

- **Dashboard em tempo real** com informações de temperatura, umidade e luminosidade
- **Seletor de culturas** que ajusta automaticamente os parâmetros ideais de monitoramento
- **Sistema de alertas** que notifica quando os parâmetros estão fora dos limites ideais
- **Modo escuro/claro** para melhor visualização em diferentes ambientes
- **Design responsivo** que se adapta a diferentes dispositivos
- **Integração com Firebase** para armazenamento e sincronização dos dados em tempo real

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React.js
- **Estilização**: CSS puro
- **Banco de Dados**: Firebase Realtime Database
- **IoT**: ESP32 conectado a sensores
- **Hospedagem**: Vercel

## 📊 Arquitetura do Projeto

```
iot-agro/
├── public/                  # Arquivos públicos
│   ├── index.html           # Página HTML principal
│   └── favicon.svg          # Ícone da página
├── src/                     # Código fonte
│   ├── assets/              # Recursos estáticos
│   │   └── agropop_logo.png # Logo do AGROPOP
│   ├── components/          # Componentes React
│   │   ├── Alert.js         # Componente de alerta
│   │   ├── Alert.css        # Estilos do alerta
│   │   ├── CulturaSelector.js # Seletor de culturas
│   │   ├── CulturaSelector.css # Estilos do seletor
│   │   ├── Dashboard.js     # Dashboard principal
│   │   ├── Dashboard.css    # Estilos do dashboard
│   │   ├── Footer.js        # Rodapé da aplicação
│   │   ├── Footer.css       # Estilos do rodapé
│   │   ├── Header.js        # Cabeçalho da aplicação
│   │   ├── Header.css       # Estilos do cabeçalho
│   │   ├── SensorCard.js    # Card para cada sensor
│   │   └── SensorCard.css   # Estilos dos cards
│   ├── data/                # Dados e configurações
│   │   └── culturasData.js  # Dados das culturas
│   ├── firebase/            # Configuração do Firebase
│   │   └── firebaseConfig.js # Configuração e funções
│   ├── App.js               # Componente principal
│   ├── App.css              # Estilos globais
│   ├── index.js             # Ponto de entrada
│   └── index.css            # Estilos para index
├── .gitignore               # Arquivos ignorados pelo Git
├── package.json             # Dependências e scripts
└── README.md                # Este arquivo
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Conta no Firebase (para funcionalidades em tempo real)

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/pfalconiere/agropop.git
cd agropop
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
```

3. **Configure o Firebase**

Crie um arquivo `src/firebase/firebaseConfig.js` com o seguinte conteúdo (substitua a URL pelo seu banco de dados Firebase):

```javascript
// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';

// Configuração do Firebase
const firebaseConfig = {
  databaseURL: "https://seu-projeto-default-rtdb.firebaseio.com/",
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Função para se inscrever nos dados dos sensores
export const subscribeToSensorData = (callback) => {
  const sensoresRef = ref(database, 'sensores');
  
  const unsubscribe = onValue(sensoresRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback(data);
    } else {
      callback({
        temperatura: 25,
        umidade: 60,
        luminosidade: 800
      });
    }
  });
  
  return unsubscribe;
};

export const readFirebaseData = async (path) => {
  const dataRef = ref(database, path);
  const snapshot = await get(dataRef);
  
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
};

export const writeFirebaseData = async (path, data) => {
  const dataRef = ref(database, path);
  await set(dataRef, data);
  return true;
};

export { database };
```

4. **Execute a aplicação**

```bash
npm start
# ou
yarn start
```

5. **Acesse a aplicação**

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação rodando.

## 📱 Configuração do ESP32

Para configurar o ESP32 para enviar dados ao Firebase, utilize o código abaixo como base:

```cpp
#include <Arduino.h>
#include <WiFi.h>
#include <FirebaseESP32.h>
#include <addons/RTDBHelper.h>

/* 1. Definir as credenciais WiFi */
#define WIFI_SSID "sua-rede-wifi"
#define WIFI_PASSWORD "sua-senha-wifi"

/* 2. Definir a URL do RTDB */
#define DATABASE_URL "https://seu-projeto-default-rtdb.firebaseio.com/"
#define DATABASE_SECRET "seu-token-secreto"

/* Objetos do Firebase */
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  // Configurar Firebase
  config.database_url = DATABASE_URL;
  config.signer.tokens.legacy_token = DATABASE_SECRET;
  Firebase.begin(&config, &auth);
  
  // Criar a estrutura de dados inicial
  Firebase.setFloat(fbdo, "/sensores/temperatura", 25.0);
  Firebase.setFloat(fbdo, "/sensores/umidade", 60.0);
  Firebase.setFloat(fbdo, "/sensores/luminosidade", 800.0);
}

void loop() {
  if (Firebase.ready() && (millis() % 5000 == 0)) {
    // Leia os sensores
    float temperatura = lerTemperatura(); // Implemente conforme seus sensores
    float umidade = lerUmidade();         // Implemente conforme seus sensores
    float luminosidade = lerLuminosidade(); // Implemente conforme seus sensores
    
    // Envie para o Firebase
    Firebase.setFloat(fbdo, "/sensores/temperatura", temperatura);
    Firebase.setFloat(fbdo, "/sensores/umidade", umidade);
    Firebase.setFloat(fbdo, "/sensores/luminosidade", luminosidade);
  }
}
```

## 🌍 Deploy

O projeto pode ser facilmente implantado na Vercel:

1. Faça um fork ou clone do repositório para sua conta GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Importe o repositório
4. Configure as variáveis de ambiente necessárias
5. Clique em "Deploy"

## 📄 Estrutura de Dados

O Firebase Realtime Database deve seguir esta estrutura para funcionar com a aplicação:

```
sensores/
├── temperatura: (número, ex: 25.4)
├── umidade: (número, ex: 68)
└── luminosidade: (número, ex: 850)
```

## 👥 Equipe

- Ana
- Evellyn
- Hobedes
- Moacir
- Pedro
- Thiago

## 📝 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🔗 Links Úteis

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Firebase Documentation](https://firebase.google.com/docs)
- [ESP32 Documentation](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/)