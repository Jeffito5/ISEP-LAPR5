/* eslint-disable prettier/prettier */
import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import config from "../../../config";
import { Container } from 'typedi';
import ICamiaoController from "../../controllers/IControllers/ICamiaoController";

/* eslint-disable prettier/prettier */
const route = Router();

export default (app: Router) => {
  app.use('/Camioes', route);

  const ctrl = Container.get(config.controllers.camiao.name) as ICamiaoController;

  route.post('',
    celebrate({
      body: Joi.object({
        matricula: Joi.string().required(),
        tara: Joi.string().required(),
        capacidadeCarga: Joi.string().required(),
        cargaBaterias: Joi.string().required(),
        autonomia: Joi.string().required(),
        tempoCarregamento: Joi.string().required(),
          
    })
    }),
    (req, res, next) => ctrl.createCamiao(req, res, next) );

  route.put('/:id',
    celebrate({
      body: Joi.object({
        matricula: Joi.string().required(),
        tara: Joi.number().required(),
        capacidadeCarga: Joi.number().required(),
        cargaBaterias: Joi.number().required(),
        autonomia: Joi.number().required(),
        tempoCarregamento: Joi.number().required(),
        ativo: Joi.boolean().required()
        
      }),
    }),
    (req, res, next) => ctrl.updateCamiao(req, res, next) );

    route.get('/:id',
    celebrate({
      body: Joi.object(),
    }),
    (req, res, next) => ctrl.getCamiao(req, res, next) );

    route.get('',
    (req, res,err) => ctrl.getAll(req,res,err))
  
  
  
  
  };