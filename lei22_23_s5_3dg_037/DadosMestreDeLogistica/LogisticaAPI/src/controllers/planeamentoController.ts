import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { Inject, Service } from 'typedi';
import config from "../../config";
import IPlaneamentoService from "../services/IServices/IPlaneamentoService";

import { Result } from "../core/logic/Result";

import IPlaneamentoController from './IControllers/IPlaneamentoController';
import CamiaoController from './camiaoController';
import { IPlaneamentoDTO } from '../dto/IPlaneamentoDTO';

@Service()
export default class PlaneamentoController implements IPlaneamentoController{
    constructor(
        @Inject(config.services.planeamento.name) private planeamentoServiceInstance : IPlaneamentoService
    ) {}



    public async createPlaneamento(req: Request, res: Response, next: NextFunction) {
        try{
            const diaEntrega = req.query.diaEntrega;
            const idCamiao = req.query.idCamiao;
            const opIndex = req.query.opIndex;
            
        
            const planeamentoOrError = (await this.planeamentoServiceInstance.createPlaneamento(idCamiao as string,opIndex as string,diaEntrega as string)) as IPlaneamentoDTO;

            if(("idCamiao" in planeamentoOrError))
                return res.status(200).json( planeamentoOrError );
            
            return res.status(404).json( planeamentoOrError );
        }catch(e){
            return next(e);
        }
    }
}