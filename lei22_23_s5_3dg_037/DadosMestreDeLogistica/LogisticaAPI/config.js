/* eslint-disable prettier/prettier */
import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://mongoadmin:ae29ede06b3b9130764c564e@vsgate-s1.dei.isep.ipp.pt:11008/?authMechanism=DEFAULT",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    rota: {
      name: "RotaController",
      path: "../controllers/rotaController"
    },

    camiao: {
      name: "CamiaoController",
      path: "../controllers/camiaoController"
    },

    planeamento: {
      name: "PlaneamentoController",
      path: "../controllers/planeamentoController"
    }
  },

  repos: {
    rota: {
      name: "RotaRepo",
      path: "../repos/rotaRepo"
    },

    camiao: {
      name: "CamiaoRepo",
      path: "../repos/camiaoRepo"
    }
  },

  services: {
    rota: {
      name: "RotaService",
      path: "../services/rotaService"
    },

    camiao: {
      name: "CamiaoService",
      path: "../services/camiaoService"
    },

    planeamento: {
      name: "PlaneamentoService",
      path: "../services/planeamentoService"
    }
  },

  planeamentoModuloUrl: {
    host: 'localhost',
    port: 5000,
    path: '/processa_entregas',
    camiaoParametro: 'idCamiao',
    servicoIndiceParametro: 'opIndex',
    dataEntregaParametro: 'dataEntrega'
  },
};
