//import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import config from "../../../config";
import { Container } from 'typedi';
import IPlaneamentoController from "../../controllers/IControllers/IPlaneamentoController";

/* eslint-disable prettier/prettier */
const route = Router();

export default (app: Router) => {
    app.use('/planeamento', route);

    const ctrl = Container.get(config.controllers.planeamento.name) as IPlaneamentoController;

    route.get('/criar_frota',
    (req, res,err) => ctrl.createPlaneamento(req,res,err));
}
