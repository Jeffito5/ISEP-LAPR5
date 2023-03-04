/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
/* eslint-disable prettier/prettier */
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import { Rota } from "../domain/Rotas/Rota";
import { IRotaDTO } from "../dto/IRotaDTO";
import { Document, Model } from 'mongoose';
import { IRotaPersistence } from '../dataschema/IRotaPersistence';

export class RotaMap extends Mapper<Rota> {

    public static toDTO( rota: Rota): IRotaDTO {
      return {
        id: rota.id.toString(),
        idArmazemOrigem: rota.idArmazemOrigem.value,
        idArmazemDestino: rota.idArmazemDestino.value,
        distancia: rota.distancia.value,
        energiaGasta: rota.energiaGasta.value,
        tempoMaximo: rota.tempoMaximo.value,
        tempoExtra: rota.tempoExtra.value,
      } as IRotaDTO;
    }
  
    public static toDomain (rota: any | Model<IRotaPersistence & Document> ): Rota {
      const rotaOrError = Rota.create(
        rota,
        new UniqueEntityID(rota.domainId)
      );
  
      rotaOrError.isFailure ? console.log(rotaOrError.error) : '';
  
      return rotaOrError.isSuccess ? rotaOrError.getValue() : null;
    }
  
    public static toPersistence (rota: Rota): any {
      return {
        domainId: rota.id.toString(),
        idArmazemOrigem: rota.idArmazemOrigem.value,
        idArmazemDestino: rota.idArmazemDestino.value,
        distancia: rota.distancia.value,
        energiaGasta: rota.energiaGasta.value,
        tempoMaximo: rota.tempoMaximo.value,
        tempoExtra: rota.tempoExtra.value
      }
    }
  }