/* eslint-disable prettier/prettier */
import { Service, Inject } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import { IdArmazem } from '../domain/Rotas/IdArmazem';
import { Rota } from '../domain/Rotas/Rota';
import { IRotaDTO } from '../dto/IRotaDTO';
import { RotaMap } from '../mappers/RotaMap';
import IRotaRepo from './IRepos/IRotaRepo';
import IRotaService from './IServices/IRotaService';

import { Distancia } from '../domain/Rotas/Distancia';
import { EnergiaGasta } from '../domain/Rotas/EnergiaGasta';
import { TempoMaximo } from '../domain/Rotas/TempoMaximo';
import { TempoExtra } from '../domain/Rotas/TempoExtra';

@Service()
export default class RotaService implements IRotaService {
  constructor(
      @Inject(config.repos.rota.name) private rotaRepo : IRotaRepo
  ) {}

  public async getRota( id: string): Promise<Result<IRotaDTO>> {
    try {
      
      const rota = await this.rotaRepo.findByDomainId(id);

      if (rota === null) {
        return Result.fail<IRotaDTO>("Rota not found");
      }
      else {
        const rotaDTOResult = RotaMap.toDTO( rota ) as IRotaDTO;
        return Result.ok<IRotaDTO>( rotaDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getRotaByIdArmazemOrigem( idArmazemOrigem: string): Promise<Result<IRotaDTO>> {
    try {
      
      const rota = await this.rotaRepo.findByIdArmazemOrigem(idArmazemOrigem);

      if (rota === null) {
        return Result.fail<IRotaDTO>("Rota not found");
      }
      else {
        const rotaDTOResult = RotaMap.toDTO( rota ) as IRotaDTO;
        return Result.ok<IRotaDTO>( rotaDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getRotaByIdArmazemDestino( idArmazemDestino: string): Promise<Result<IRotaDTO>> {
    try {
      
      const rota = await this.rotaRepo.findByIdArmazemDestino(idArmazemDestino);

      if (rota === null) {
        return Result.fail<IRotaDTO>("Rota not found");
      }
      else {
        const rotaDTOResult = RotaMap.toDTO( rota ) as IRotaDTO;
        return Result.ok<IRotaDTO>( rotaDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async getAll(): Promise<IRotaDTO[]> {
    try {
        var allRotaResult:IRotaDTO[]=[];
        const allRotas = await this.rotaRepo.getAll();

        if (allRotas === null) {
            return null;
        }
        for(var i=0; i<allRotas.length; i++){
            allRotaResult.push(await RotaMap.toDTO(allRotas[i]));
        }
        return allRotaResult;
    } catch (e) {
        throw e;
    }
  }

  public async createRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>> {
    
    try {

      const rotaOrError = await Rota.create( rotaDTO );
      
      if (rotaOrError.isFailure) {
        return Result.fail<IRotaDTO>(rotaOrError.errorValue());
      }

      const rotaResult = rotaOrError.getValue();

      await this.rotaRepo.save(rotaResult);

      const rotaDTOResult = RotaMap.toDTO( rotaResult ) as IRotaDTO;
      return Result.ok<IRotaDTO>( rotaDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>> {
    try {
      const rota = await this.rotaRepo.findByDomainId(rotaDTO.id);
      
      if (rota === null) {
        return Result.fail<IRotaDTO>("Rota not found");
      }
      else {
        rota.idArmazemOrigem = IdArmazem.create(rotaDTO.idArmazemOrigem).getValue();
        rota.idArmazemDestino = IdArmazem.create(rotaDTO.idArmazemDestino).getValue();
        rota.distancia = Distancia.create(rotaDTO.distancia).getValue();
        rota.energiaGasta = EnergiaGasta.create(rotaDTO.energiaGasta).getValue();
        rota.tempoMaximo = TempoMaximo.create(rotaDTO.tempoMaximo).getValue();
        rota.tempoExtra = TempoExtra.create(rotaDTO.tempoExtra).getValue();
        await this.rotaRepo.save(rota);

        const rotaDTOResult = RotaMap.toDTO( rota ) as IRotaDTO;
        return Result.ok<IRotaDTO>( rotaDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async updateRotaArmazemOrigem(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>> {
    try {
      const rota = await this.rotaRepo.findByIdArmazemOrigem(rotaDTO.idArmazemOrigem);
      
      if (rota === null) {
        return Result.fail<IRotaDTO>("Rota not found");
      }
      else {
        rota.idArmazemOrigem = IdArmazem.create(rotaDTO.idArmazemOrigem).getValue();
        rota.idArmazemDestino = IdArmazem.create(rotaDTO.idArmazemDestino).getValue();
        rota.distancia = Distancia.create(rotaDTO.distancia).getValue();
        rota.energiaGasta = EnergiaGasta.create(rotaDTO.energiaGasta).getValue();
        rota.tempoMaximo = TempoMaximo.create(rotaDTO.tempoMaximo).getValue();
        rota.tempoExtra = TempoExtra.create(rotaDTO.tempoExtra).getValue();
        await this.rotaRepo.save(rota);

        const rotaDTOResult = RotaMap.toDTO( rota ) as IRotaDTO;
        return Result.ok<IRotaDTO>( rotaDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async updateRotaArmazemDestino(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>> {
    try {
      const rota = await this.rotaRepo.findByIdArmazemDestino(rotaDTO.idArmazemDestino);
      
      if (rota === null) {
        return Result.fail<IRotaDTO>("Rota not found");
      }
      else {
        rota.idArmazemOrigem = IdArmazem.create(rotaDTO.idArmazemOrigem).getValue();
        rota.idArmazemDestino = IdArmazem.create(rotaDTO.idArmazemDestino).getValue();
        rota.distancia = Distancia.create(rotaDTO.distancia).getValue();
        rota.energiaGasta = EnergiaGasta.create(rotaDTO.energiaGasta).getValue();
        rota.tempoMaximo = TempoMaximo.create(rotaDTO.tempoMaximo).getValue();
        rota.tempoExtra = TempoExtra.create(rotaDTO.tempoExtra).getValue();
        await this.rotaRepo.save(rota);

        const rotaDTOResult = RotaMap.toDTO( rota ) as IRotaDTO;
        return Result.ok<IRotaDTO>( rotaDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }
}