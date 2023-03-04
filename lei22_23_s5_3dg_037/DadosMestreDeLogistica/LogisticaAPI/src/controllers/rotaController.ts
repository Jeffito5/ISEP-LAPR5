import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import { IRotaDTO } from '../dto/IRotaDTO';
import IRotaService from '../services/IServices/IRotaService';
import IRotaController from './IControllers/IRotaController';


@Service()
export default class RotaController implements IRotaController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.rota.name) private rotaServiceInstance : IRotaService
  ) {}

  public async createRota(req: Request, res: Response, next: NextFunction) {
    
    try {
      
      const rotaOrError = await this.rotaServiceInstance.createRota(req.body as IRotaDTO) as Result<IRotaDTO>;
        
      if (rotaOrError.isFailure) {
        return res.status(402).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.json( rotaDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateRota(req: Request, res: Response, next: NextFunction) {
    try {
      
      const id = req.params.id
      const idArmazemOrigem = req.body.idArmazemOrigem
      const idArmazemDestino = req.body.idArmazemDestino
      const distancia = req.body.distancia
      const energiaGasta = req.body.energiaGasta
      const tempoMaximo = req.body.tempoMaximo
      const tempoExtra = req.body.tempoExtra

      const rotaOrError = await this.rotaServiceInstance.updateRota({id, idArmazemOrigem, idArmazemDestino, distancia, energiaGasta, tempoMaximo, tempoExtra} as IRotaDTO) as Result<IRotaDTO>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateRotaArmazemOrigem(req: Request, res: Response, next: NextFunction) {
    try {
      
      const id = req.params.id
      const idArmazemOrigem = req.body.idArmazemOrigem
      const idArmazemDestino = req.body.idArmazemDestino
      const distancia = req.body.distancia
      const energiaGasta = req.body.energiaGasta
      const tempoMaximo = req.body.tempoMaximo
      const tempoExtra = req.body.tempoExtra

      const rotaOrError = await this.rotaServiceInstance.updateRotaArmazemOrigem({id, idArmazemOrigem, idArmazemDestino, distancia, energiaGasta, tempoMaximo, tempoExtra} as IRotaDTO) as Result<IRotaDTO>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateRotaArmazemDestino(req: Request, res: Response, next: NextFunction) {
    try {
      
      const id = req.params.id
      const idArmazemOrigem = req.body.idArmazemOrigem
      const idArmazemDestino = req.body.idArmazemDestino
      const distancia = req.body.distancia
      const energiaGasta = req.body.energiaGasta
      const tempoMaximo = req.body.tempoMaximo
      const tempoExtra = req.body.tempoExtra

      const rotaOrError = await this.rotaServiceInstance.updateRotaArmazemDestino({id, idArmazemOrigem, idArmazemDestino, distancia, energiaGasta, tempoMaximo, tempoExtra} as IRotaDTO) as Result<IRotaDTO>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getRota(req: Request, res: Response, next: NextFunction) {
    try {
      
      const rotaOrError = await this.rotaServiceInstance.getRota(req.params.id) as Result<IRotaDTO>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getRotaByIdArmazemOrigem(req: Request, res: Response, next: NextFunction) {
    try {

      const rotaOrError = await this.rotaServiceInstance.getRotaByIdArmazemOrigem(req.params.idArmazemOrigem) as Result<IRotaDTO>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };


public async getRotaByIdArmazemDestino(req: Request, res: Response, next: NextFunction) {
    try {

      const rotaOrError = await this.rotaServiceInstance.getRotaByIdArmazemDestino(req.params.idArmazemDestino) as Result<IRotaDTO>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
        var allRotas= await this.rotaServiceInstance.getAll();
        if (!allRotas) {
            return res.status(402).send();
        }
        
        return res.status(201).send(allRotas);
    } catch (e) {
        console.log(e);
        return res.status(400).send();
    }
}
}