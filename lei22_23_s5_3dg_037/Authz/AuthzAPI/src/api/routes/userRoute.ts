import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { Container } from 'typedi';
import IUserController from '../../controllers/IControllers/IUserController';
import config from "../../../config";
import winston from "winston";
import middlewares from "../middlewares";
import { User } from "../../domain/Users/User";

const route = Router();
export default (app: Router) => {
  app.use('/auth', route);

  const ctrl = Container.get(config.controllers.user.name) as IUserController;

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
     (req, res, next) => ctrl.signIn(req, res, next));

  
  route.post(
    '/logout',
     middlewares.isAuth,
      (req, res, next) => ctrl.logOut(req, res, next));
  
  app.use('/users', route);
  
  route.post('',
    celebrate({
      body: Joi.object({
        nome: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        dataNascimento: Joi.string().required(),
        numeroTelefone: Joi.number().required(),
        tipoUser: Joi.string().required()
      })
    }),
    (req, res, next) => ctrl.createUser(req, res, next));


  route.get('',
    (req, res, err) => ctrl.getAll(req, res, err));

  route.delete('/:email',
    (req, res, err) => ctrl.deleteUser(req, res, err));


    route.post('/get/:email', (req, res, next) => {     ctrl.getUserByEmail(req, res, next);   });

  };

