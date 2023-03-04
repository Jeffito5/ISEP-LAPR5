/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
/* eslint-disable prettier/prettier */
import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRotaPersistence } from '../dataschema/IRotaPersistence';
import { Rota } from '../domain/Rotas/Rota';

import { RotaMap } from '../mappers/RotaMap';
import IRotaRepo from '../services/IRepos/IRotaRepo';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { IdArmazem } from '../domain/Rotas/IdArmazem';


@Service()
export default class RotaRepo implements IRotaRepo {
  private models: any;

  constructor(
    @Inject('rotaSchema') private rotaSchema : Model<IRotaPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(rota: Rota): Promise<boolean> {
    
    const idX = rota.id instanceof Rota ? (<Rota>rota.id).id.toValue() : rota.id;

    const query = { domainId: idX}; 
    const rotaDocument = await this.rotaSchema.findOne( query as FilterQuery<IRotaPersistence & Document>);

    return !!rotaDocument === true;
  }

  public async save (rota: Rota): Promise<Rota> {
    const query = { domainId: rota.id.toString()}; 

    const rotaDocument = await this.rotaSchema.findOne( query );

    try {
      if (rotaDocument === null ) {
        const rawRota: any = RotaMap.toPersistence(rota);

        const rotaCreated = await this.rotaSchema.create(rawRota);

        return RotaMap.toDomain(rotaCreated);
      } else {
        rotaDocument.idArmazemOrigem = rota.idArmazemOrigem.value;
        rotaDocument.idArmazemDestino = rota.idArmazemDestino.value;
        rotaDocument.distancia = rota.distancia.value;
        rotaDocument.energiaGasta = rota.energiaGasta.value;
        rotaDocument.tempoMaximo = rota.tempoMaximo.value;
        rotaDocument.tempoExtra = rota.tempoExtra.value;
        await rotaDocument.save();

        return rota;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (id: UniqueEntityID | string): Promise<Rota> {
    
    const query = { domainId: id};
    const rotaRecord = await this.rotaSchema.findOne( query as FilterQuery<IRotaPersistence & Document> );

    if( rotaRecord != null) {
      return RotaMap.toDomain(rotaRecord);
    }
    else
      return null;
  }

  public async findByIdArmazemOrigem (id: string): Promise<Rota> {
    
    const query = { idArmazemOrigem: id};
    const rotaRecord = await this.rotaSchema.findOne( query as FilterQuery<IRotaPersistence & Document> );

    if( rotaRecord != null) {
      return RotaMap.toDomain(rotaRecord);
    }
    else
      return null;
  }

  public async findByIdArmazemDestino (id: string): Promise<Rota> {
    
    const query = { idArmazemDestino: id};
    const rotaRecord = await this.rotaSchema.findOne( query as FilterQuery<IRotaPersistence & Document> );

    if( rotaRecord != null) {
      return RotaMap.toDomain(rotaRecord);
    }
    else
      return null;
  }

  public async getAll(): Promise<Rota[]> {
    var allRotasReturn:Rota[]=[];
    const allRotas = await this.rotaSchema.find({}) ;
    try {
        for (var i = 0; i < allRotas.length; i++) {
          allRotasReturn.push(await RotaMap.toDomain(allRotas[i]))
        }
        return allRotasReturn;
    }catch(err){
        throw err;
    }
}

  // public async findByIdArmazemDestino (id: string): Promise<Rota> {
    
  //   const query = { idArmazem: id};
  //   const rotaRecord = await this.rotaSchema.findOne( query as FilterQuery<IRotaPersistence & Document> );

  //   if( rotaRecord != null) {
  //     return RotaMap.toDomain(rotaRecord);
  //   }
  //   else
  //     return null;
  // }
}