import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';


import config from "../../../config";
import IRotaController from '../../controllers/IControllers/IRotaController';

const route = Router();

export default (app: Router) => {
  app.use('/rotas', route);

  const ctrl = Container.get(config.controllers.rota.name) as IRotaController;

  route.post('',
    celebrate({
      body: Joi.object({
        idArmazemOrigem: Joi.string().required(),
        idArmazemDestino: Joi.string().required(),
        distancia: Joi.number().required(),
        energiaGasta: Joi.number().required(),
        tempoMaximo: Joi.number().required(),
        tempoExtra: Joi.number().required()
        
      })
    }),
    (req, res, next) => ctrl.createRota(req, res, next) );

  route.put('/:id',
    celebrate({
      body: Joi.object({
        idArmazemOrigem: Joi.string().required(),
        idArmazemDestino: Joi.string().required(),
        distancia: Joi.number().required(),
        energiaGasta: Joi.number().required(),
        tempoMaximo: Joi.number().required(),
        tempoExtra: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updateRota(req, res, next) );

    route.put('/idArmazemOrigem/:idArmazemOrigem',
    celebrate({
      body: Joi.object({
        idArmazemOrigem: Joi.string().required(),
        idArmazemDestino: Joi.string().required(),
        distancia: Joi.number().required(),
        energiaGasta: Joi.number().required(),
        tempoMaximo: Joi.number().required(),
        tempoExtra: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updateRotaArmazemOrigem(req, res, next) );

    route.put('/idArmazemDestino/:idArmazemDestino',
    celebrate({
      body: Joi.object({
        idArmazemOrigem: Joi.string().required(),
        idArmazemDestino: Joi.string().required(),
        distancia: Joi.number().required(),
        energiaGasta: Joi.number().required(),
        tempoMaximo: Joi.number().required(),
        tempoExtra: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updateRotaArmazemDestino(req, res, next) );

    route.get('/:id',
    celebrate({
      body: Joi.object(),
    }),
    (req, res, next) => ctrl.getRota(req, res, next) );

    route.get('',
    (req, res,err) => ctrl.getAll(req,res,err));

    route.get('/idArmazemOrigem/:idArmazemOrigem',
    celebrate({
      body: Joi.object(),
    }),
    (req, res, next) => ctrl.getRotaByIdArmazemOrigem(req, res, next) );


    route.get('/idArmazemDestino/:idArmazemDestino',
    celebrate({
      body: Joi.object(),
    }),
    (req, res, next) => ctrl.getRotaByIdArmazemDestino(req, res, next) );


    // route.delete('',
    // celebrate({
    //   body: Joi.object({
    //     id: Joi.string().required(),
    //     name: Joi.string().required()
    //   }),
    // }),
    // (req, res, next) => ctrl.deleteRota(req, res, next) );
};