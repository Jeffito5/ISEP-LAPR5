/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { Container } from 'typedi';

import { Mapper } from '../core/infra/Mapper';


import { UniqueEntityID } from '../core/domain/UniqueEntityID';




import { Camiao } from '../domain/Camioes/Camiao';
import { ICamiaoDTO } from '../dto/ICamiaoDTO';
import camiaoRepo from '../repos/camiaoRepo';
import { raw } from 'body-parser';
import { Model, Document } from 'mongoose';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';

export class CamiaoMap extends Mapper<Camiao> {
  public static toDTO(camiao: Camiao): ICamiaoDTO {
    return {
      id: camiao.id.toString(),
      matricula: camiao.matricula.value,
      tara: camiao.tara.value,
      capacidadeCarga: camiao.capacidadeCarga.value,
      cargaBaterias: camiao.cargaBaterias.value,
      autonomia: camiao.autonomia.value,
      tempoCarregamento: camiao.tempoCarregamento.value,
      ativo: camiao.ativo
      
    }  as ICamiaoDTO;
  }

  public static  toDomain(camiao:any| Model <ICamiaoPersistence & Document>):Camiao{

    const camiaoOrError = Camiao.create(
      camiao,
      new UniqueEntityID(camiao.domainId)
    
     
    );

    camiaoOrError.isFailure ? console.log(camiaoOrError.error) : '';

    return camiaoOrError.isSuccess ? camiaoOrError.getValue() : null;
  }

  public static toPersistence(camiao: Camiao): any {
    const a = {
      domainId: camiao.id.toString(),
      matricula: camiao.matricula.value,
      tara: camiao.tara.value,
      capacidadeCarga: camiao.capacidadeCarga.value,
      cargaBaterias: camiao.cargaBaterias.value,
      autonomia: camiao.autonomia.value,
      tempoCarregamento: camiao.tempoCarregamento.value,
      ativo: camiao.ativo
    };
    return a;
  }
}
