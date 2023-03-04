/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from "express";
import { Service, Inject } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import { ICamiaoDTO } from "../dto/ICamiaoDTO";
import { IRotaDTO } from "../dto/IRotaDTO";
import ICamiaoService from "../services/IServices/ICamiaoService";
import IRotaService from "../services/IServices/IRotaService";
import ICamiaoController from "./IControllers/ICamiaoController";

/* eslint-disable prettier/prettier */
@Service()
export default class CamiaoController implements ICamiaoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.camiao.name) private camiaoServiceInstance : ICamiaoService
  ) {}

  public async createCamiao(req: Request, res: Response, next: NextFunction) {
    try {
      const camiaoOrError = await this.camiaoServiceInstance.createCamiao(req.body as ICamiaoDTO) as Result<ICamiaoDTO>;
        
      if (camiaoOrError.isFailure) {
        return res.status(402).send();
      }

      const camiaoDTO = camiaoOrError.getValue();
      return res.json( camiaoDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateCamiao(req: Request, res: Response, next: NextFunction) {
    try {
      const id=req.params.id
      const matricula= req.body.matricula
      const tara= req.body.tara
      const capacidadeCarga= req.body.capacidadeCarga
      const cargaBaterias= req.body.cargaBaterias
      const autonomia = req.body.autonomia
      const tempoCarregamento = req.body.tempoCarregamento
      const ativo =req.body.ativo

      const camiaoOrError = await this.camiaoServiceInstance.updateCamiao({id,matricula,tara,capacidadeCarga,cargaBaterias,autonomia,tempoCarregamento,ativo}as ICamiaoDTO) as Result<ICamiaoDTO>;

      if (camiaoOrError.isFailure) {
        return res.status(404).send();
      }

      const camiaoDTO = camiaoOrError.getValue();
      return res.status(201).json( camiaoDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getCamiao(req: Request, res: Response, next: NextFunction) {
    try {
      
      const camiaoOrError = await this.camiaoServiceInstance.getCamiao(req.params.id) as Result<ICamiaoDTO>;

      if (camiaoOrError.isFailure) {
        return res.status(404).send();
      }

      const camiaoDTO = camiaoOrError.getValue();
      return res.status(201).json( camiaoDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAll(req: Request, res: Response, next: NextFunction) {
        
        try {
            var allCamioes= await this.camiaoServiceInstance.getAll();
            if (!allCamioes) {
                return res.status(402).send();
            }
            
            return res.status(200).send(allCamioes);
        } catch (e) {
            console.log(e);
            return res.status(400).send();
        }
    }

}