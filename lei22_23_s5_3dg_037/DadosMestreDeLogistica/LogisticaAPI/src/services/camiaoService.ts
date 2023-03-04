/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Service, Inject } from 'typedi';
import config from "../../config";


import { Result } from "../core/logic/Result";
import { Camiao } from '../domain/Camioes/Camiao';
import { ICamiaoDTO } from '../dto/ICamiaoDTO';
import { CamiaoMap } from '../mappers/CamiaoMap';
import ICamiaoRepo from './IRepos/ICamiaoRepo';
import ICamiaoService from './IServices/ICamiaoService';
import { Tara } from '../domain/Camioes/Tara';
import { CapacidadeCarga } from '../domain/Camioes/CapacidadeCarga';
import { CargaBaterias } from '../domain/Camioes/CargaBaterias';
import { Autonomia } from '../domain/Camioes/Autonomia';
import { TempoCarregamento } from '../domain/Camioes/TempoCarregamento';
import { Matricula } from '../domain/Camioes/Matricula';

@Service()
export default class CamiaoService implements ICamiaoService {
  
  constructor(
      @Inject(config.repos.camiao.name) private camiaoRepo : ICamiaoRepo
  ) {}

  public async getCamiao( id: string): Promise<Result<ICamiaoDTO>> {
    try {
      const camiao = await this.camiaoRepo.findByDomainId(id);

      if (camiao === null) {
        return Result.fail<ICamiaoDTO>("O camião nao foi encontrado");
      }
      else {
        const camiaoDTOResult = CamiaoMap.toDTO( camiao ) as ICamiaoDTO;
        return Result.ok<ICamiaoDTO>( camiaoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
    try {

      const camiaoOrError = await Camiao.create( camiaoDTO );

      if (camiaoOrError.isFailure) {
        return Result.fail<ICamiaoDTO>(camiaoOrError.errorValue());
      }

      const camiaoResult = camiaoOrError.getValue();

      await this.camiaoRepo.save(camiaoResult);

      const camiaoDTOResult = CamiaoMap.toDTO( camiaoResult ) as ICamiaoDTO;
      return Result.ok<ICamiaoDTO>( camiaoDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
    try {
      const camiao = await this.camiaoRepo.findByDomainId(camiaoDTO.id);

      if (camiao === null) {
        return Result.fail<ICamiaoDTO>("O camiao não foi encontrado");
      }
      else {
        camiao.matricula=Matricula.create(camiaoDTO.matricula).getValue(); 
        camiao.tara=Tara.create(camiaoDTO.tara).getValue();
         camiao.capacidadeCarga=CapacidadeCarga.create(camiaoDTO.capacidadeCarga).getValue();
         camiao.cargaBaterias=CargaBaterias.create(camiaoDTO.cargaBaterias).getValue();
         camiao.autonomia=Autonomia.create(camiaoDTO.autonomia).getValue();
         camiao.tempoCarregamento=TempoCarregamento.create(camiaoDTO.tempoCarregamento).getValue();
         camiao.ativo=camiaoDTO.ativo.valueOf();
        await this.camiaoRepo.save(camiao);

        const camiaoDTOResult = CamiaoMap.toDTO( camiao ) as ICamiaoDTO;
        return Result.ok<ICamiaoDTO>( camiaoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }
  public async getAll(): Promise<ICamiaoDTO[]> {
     
    try {
            var allCamiaoResult:ICamiaoDTO[]=[];
            const allCamiao = await this.camiaoRepo.getAll();
    
            if (allCamiao === null) {
                return null;
            }
            for(var i=0; i<allCamiao.length; i++){
                allCamiaoResult.push(await CamiaoMap.toDTO(allCamiao[i]));
            }
            return allCamiaoResult;
        } catch (e) {
            throw e;
        }
      }
}


