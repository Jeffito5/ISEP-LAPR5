/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */

import { Model, Document, FilterQuery } from "mongoose";
import { Service, Inject } from "typedi";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { ICamiaoPersistence } from "../dataschema/ICamiaoPersistence";
import { Camiao } from "../domain/Camioes/Camiao";
import { CamiaoId } from "../domain/Camioes/CamiaoId";
import { CamiaoMap } from "../mappers/CamiaoMap";

import ICamiaoRepo from "../services/IRepos/ICamiaoRepo";

/* eslint-disable prettier/prettier */
@Service()
export default class camiaoRepo implements ICamiaoRepo {
  private models: any;
  

  constructor(
    @Inject('camiaoSchema') private camiaoSchema : Model<ICamiaoPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }


  public async exists(camiao: Camiao): Promise<boolean> {
    
    const idX = camiao.id instanceof Camiao ? (<Camiao>camiao.id).id.toValue() : camiao.id;

    const query = { domainId: idX}; 
    const rotaDocument = await this.camiaoSchema.findOne( query as FilterQuery<ICamiaoPersistence & Document>);

    return !!rotaDocument === true;
  }

  public async save (camiao: Camiao): Promise<Camiao> {
    const query = { domainId: camiao.id.toString()}; 

    const camiaoDocument = await this.camiaoSchema.findOne( query );

    try {
      if (camiaoDocument === null ) {
        const rawCamiao: any = CamiaoMap.toPersistence(camiao);

        const camiaoCreated = await this.camiaoSchema.create(rawCamiao);

        return CamiaoMap.toDomain(camiaoCreated);
      } else {
        camiaoDocument.matricula=camiao.matricula.value;
        camiaoDocument.tara = camiao.tara.value;
        camiaoDocument.capacidadeCarga=camiao.capacidadeCarga.value;
        camiaoDocument.cargaBaterias=camiao.cargaBaterias.value;
        camiaoDocument.autonomia=camiao.autonomia.value;
        camiaoDocument.tempoCarregamento=camiao.tempoCarregamento.value;
        camiaoDocument.ativo=true;
        await camiaoDocument.save();

        return camiao;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (id: UniqueEntityID|string): Promise<Camiao> {
    const query = { domainId: id};
    const camiaoRecord = await this.camiaoSchema.findOne( query as FilterQuery<ICamiaoPersistence & Document> );

    if( camiaoRecord != null) {
      return CamiaoMap.toDomain(camiaoRecord);
    }
    else
      return null;
  }

  public async getAll(): Promise<Camiao[]> {
        
        var allCamiaoReturn:Camiao[]=[];
        const allCamiao = await this.camiaoSchema.find({}) ;
        try {
            for (var i = 0; i < allCamiao.length; i++) {
              allCamiaoReturn.push(await CamiaoMap.toDomain(allCamiao[i]))
            }
            return allCamiaoReturn;
        }catch(err){
            throw err;
        }

}
}