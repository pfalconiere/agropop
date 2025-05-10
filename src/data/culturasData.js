// data/culturasData.js - Baseado nos dados reais da tabela fornecida
const culturasData = [
    {
      id: 1,
      nome: "Tomate / Pimentão",
      limites: {
        temperatura: { min: 25, max: 40 },
        luminosidade: { min: 4000, max: 10000 },
        umidade: { min: 30, max: 60 }
      },
      niveis: {
        temperatura: {
          otimo: 25,
          bom: 30,
          regular: 35,
          ruim: 40
        },
        luminosidade: {
          otimo: 10000,
          bom: 8000,
          regular: 6000,
          ruim: 4000
        },
        umidade: {
          otimo: 60,
          bom: 50,
          regular: 40,
          ruim: 30
        }
      },
      descricao: "Culturas de tomate e pimentão necessitam de boa luminosidade e umidade controlada."
    },
    {
      id: 2,
      nome: "Alface / Couve / Rúcula",
      limites: {
        temperatura: { min: 20, max: 32 },
        luminosidade: { min: 2000, max: 8000 },
        umidade: { min: 40, max: 70 }
      },
      niveis: {
        temperatura: {
          otimo: 20,
          bom: 25,
          regular: 28,
          ruim: 32
        },
        luminosidade: {
          otimo: 8000,
          bom: 6000,
          regular: 4000,
          ruim: 2000
        },
        umidade: {
          otimo: 70,
          bom: 60,
          regular: 50,
          ruim: 40
        }
      },
      descricao: "Folhas verdes que preferem temperaturas mais amenas e umidade mais elevada."
    },
    {
      id: 3,
      nome: "Feijão / Amendoim",
      limites: {
        temperatura: { min: 22, max: 35 },
        luminosidade: { min: 3000, max: 9000 },
        umidade: { min: 35, max: 65 }
      },
      niveis: {
        temperatura: {
          otimo: 22,
          bom: 27,
          regular: 30,
          ruim: 35
        },
        luminosidade: {
          otimo: 9000,
          bom: 7000,
          regular: 5000,
          ruim: 3000
        },
        umidade: {
          otimo: 65,
          bom: 55,
          regular: 45,
          ruim: 35
        }
      },
      descricao: "Leguminosas que precisam de solo relativamente seco e luminosidade moderada a alta."
    },
    {
      id: 4,
      nome: "Milho / Soja",
      limites: {
        temperatura: { min: 26, max: 38 },
        luminosidade: { min: 4000, max: 10000 },
        umidade: { min: 30, max: 60 }
      },
      niveis: {
        temperatura: {
          otimo: 26,
          bom: 30,
          regular: 34,
          ruim: 38
        },
        luminosidade: {
          otimo: 10000,
          bom: 8500,
          regular: 6500,
          ruim: 4000
        },
        umidade: {
          otimo: 60,
          bom: 50,
          regular: 40,
          ruim: 30
        }
      },
      descricao: "Grãos que necessitam de alta luminosidade e toleram temperaturas mais elevadas."
    },
    {
      id: 5,
      nome: "Mandioca / Batata-doce / Inhame",
      limites: {
        temperatura: { min: 28, max: 38 },
        luminosidade: { min: 3500, max: 9500 },
        umidade: { min: 35, max: 65 }
      },
      niveis: {
        temperatura: {
          otimo: 28,
          bom: 32,
          regular: 35,
          ruim: 38
        },
        luminosidade: {
          otimo: 9500,
          bom: 8000,
          regular: 6000,
          ruim: 3500
        },
        umidade: {
          otimo: 65,
          bom: 55,
          regular: 45,
          ruim: 35
        }
      },
      descricao: "Culturas de tubérculos que toleram altas temperaturas e necessitam de umidade moderada."
    },
    {
      id: 6,
      nome: "Banana / Mamão / Abacaxi",
      limites: {
        temperatura: { min: 27, max: 36 },
        luminosidade: { min: 3000, max: 9000 },
        umidade: { min: 45, max: 75 }
      },
      niveis: {
        temperatura: {
          otimo: 27,
          bom: 30,
          regular: 33,
          ruim: 36
        },
        luminosidade: {
          otimo: 9000,
          bom: 7500,
          regular: 5500,
          ruim: 3000
        },
        umidade: {
          otimo: 75,
          bom: 65,
          regular: 55,
          ruim: 45
        }
      },
      descricao: "Frutas tropicais que necessitam de alta umidade e boa luminosidade."
    },
    {
      id: 7,
      nome: "Café / Cacau",
      limites: {
        temperatura: { min: 23, max: 35 },
        luminosidade: { min: 3000, max: 8500 },
        umidade: { min: 30, max: 60 }
      },
      niveis: {
        temperatura: {
          otimo: 23,
          bom: 27,
          regular: 30,
          ruim: 35
        },
        luminosidade: {
          otimo: 8500,
          bom: 7000,
          regular: 5000,
          ruim: 3000
        },
        umidade: {
          otimo: 60,
          bom: 50,
          regular: 40,
          ruim: 30
        }
      },
      descricao: "Culturas de clima tropical que preferem sombra parcial e umidade controlada."
    },
    {
      id: 8,
      nome: "Maracujá / Acerola / Cajá",
      limites: {
        temperatura: { min: 26, max: 36 },
        luminosidade: { min: 4000, max: 10000 },
        umidade: { min: 40, max: 70 }
      },
      niveis: {
        temperatura: {
          otimo: 26,
          bom: 29,
          regular: 32,
          ruim: 36
        },
        luminosidade: {
          otimo: 10000,
          bom: 8500,
          regular: 6500,
          ruim: 4000
        },
        umidade: {
          otimo: 70,
          bom: 60,
          regular: 50,
          ruim: 40
        }
      },
      descricao: "Frutas tropicais que precisam de boa luminosidade e umidade relativamente alta."
    }
  ];
  
  export default culturasData;