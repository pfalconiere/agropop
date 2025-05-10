// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';

// Configuração do Firebase
const firebaseConfig = {
  databaseURL: "https://mes2025-1-thunderbolts-default-rtdb.firebaseio.com/",
  // Não precisamos de outras configurações já que estamos usando o token legado
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Obter uma referência ao banco de dados
const database = getDatabase(app);

// Função para ler dados do Firebase com autenticação
export const subscribeToSensorData = (callback) => {
  const sensoresRef = ref(database, 'sensores');
  
  // Ouvir mudanças nos dados dos sensores
  const unsubscribe = onValue(sensoresRef, (snapshot) => {
    const data = snapshot.val();
    console.log('TEM DATA?: ' + data)
    if (data) {
      callback(data);
      console.log('TEM DATA?: ' + data)
    } else {
      console.log("Não há dados disponíveis nos sensores.");
      // Enviar dados padrão se não houver dados
      callback({
        temperatura: 0,
        umidade: 0,
        luminosidade: 0
      });
    }
  }, (error) => {
    console.error("Erro ao ler dados:", error);
  });
  
  // Retornar função para desinscrever
  return unsubscribe;
};

// Função para ler um valor específico uma única vez
export const readFirebaseData = async (path) => {
  try {
    const dataRef = ref(database, path);
    const snapshot = await get(dataRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("Não há dados disponíveis no caminho:", path);
      return null;
    }
  } catch (error) {
    console.error("Erro ao ler dados:", error);
    return null;
  }
};

// Função para gravar dados no Firebase
export const writeFirebaseData = async (path, data) => {
  try {
    const dataRef = ref(database, path);
    await set(dataRef, data);
    return true;
  } catch (error) {
    console.error("Erro ao gravar dados:", error);
    return false;
  }
};

export { database };