/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const rotaSchema = {
    // compare with the approach followed in repos and services
    name: 'rotaSchema',
    schema: '../persistence/schemas/rotaSchema',
  };

  const camiaoSchema = {
    name: 'camiaoSchema',
    schema: '../persistence/schemas/camiaoSchema',
  };

  const rotaController = {
    name: config.controllers.rota.name,
    path: config.controllers.rota.path
  }

  const camiaoController = {
    name: config.controllers.camiao.name,
    path: config.controllers.camiao.path,
  }

  const planeamentoController = {
    name: config.controllers.planeamento.name,
    path: config.controllers.planeamento.path,
  }

  const rotaRepo = {
    name: config.repos.rota.name,
    path: config.repos.rota.path
  }

  const camiaoRepo = {
    name: config.repos.camiao.name,
    path: config.repos.camiao.path
  }

  const rotaService = {
    name: config.services.rota.name,
    path: config.services.rota.path
  }

  const camiaoService = {
    name: config.services.camiao.name,
    path: config.services.camiao.path
  }

  const planeamentoService = {
    name: config.services.planeamento.name,
    path: config.services.planeamento.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      rotaSchema,
      camiaoSchema
    ],
    controllers: [
      rotaController,
      camiaoController,
      planeamentoController
    ],
    repos: [
      rotaRepo,
      camiaoRepo
    ],
    services: [
      rotaService,
      camiaoService,
      planeamentoService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
