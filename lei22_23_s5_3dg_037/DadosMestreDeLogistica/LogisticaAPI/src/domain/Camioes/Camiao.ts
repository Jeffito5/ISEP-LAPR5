/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable prettier/prettier */
import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';
import { ICamiaoDTO } from '../../dto/ICamiaoDTO';

import { Autonomia } from './Autonomia';
import { CapacidadeCarga } from './CapacidadeCarga';
import { CargaBaterias } from './CargaBaterias';
import { Matricula } from './Matricula';
import { Tara } from './Tara';
import { TempoCarregamento } from './TempoCarregamento';

interface CamiaoProps {
  matricula: Matricula;
  tara: Tara;
  capacidadeCarga: CapacidadeCarga;
  cargaBaterias: CargaBaterias;
  autonomia: Autonomia;
  tempoCarregamento: TempoCarregamento;
  ativo: boolean;

}

export class Camiao extends AggregateRoot<CamiaoProps> {
  
 get id(): UniqueEntityID {
    return this._id;
  }

 /* get auxId(): string{
    return this.props.auxId;
  }*/

  get ativo(): boolean{
    return this.props.ativo;
     }

 get matricula(): Matricula{
return this.props.matricula;
 }
  
  get tara(): Tara {
    return this.props.tara;
  }

  get capacidadeCarga(): CapacidadeCarga {
    return this.props.capacidadeCarga;
  }

  get cargaBaterias(): CargaBaterias {
    return this.props.cargaBaterias;
  }

  get autonomia(): Autonomia {
    return this.props.autonomia;
  }

  get tempoCarregamento(): TempoCarregamento {
    return this.props.tempoCarregamento;
  }
  /*set auxId ( value: string) {
    this.props.auxId = value;
  }*/

  set matricula(value: Matricula){
    this.props.matricula=value;
  }
  set tara(value: Tara) {
    this.props.tara = value;
  }

  set capacidadeCarga(value: CapacidadeCarga) {
    this.props.capacidadeCarga = value;
  }
  
  set cargaBaterias(value: CargaBaterias) {
    this.props.cargaBaterias = value;
  }
  set autonomia(value: Autonomia) {
    this.props.autonomia = value;
  }

  set ativo(value: boolean) {
    this.props.ativo = value;
  }

  set tempoCarregamento(value: TempoCarregamento) {
    this.props.tempoCarregamento = value;
  }

  private constructor(props: CamiaoProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ICamiaoDTO, id?: UniqueEntityID): Result<Camiao> {
 
    const matricula= Matricula.create(props.matricula).getValue();
    const tara= Tara.create(props.tara).getValue();
    const capacidadeCarga= CapacidadeCarga.create(props.capacidadeCarga).getValue();
    const cargaBaterias= CargaBaterias.create(props.cargaBaterias).getValue();
    const autonomia= Autonomia.create(props.autonomia).getValue();
    const tempoCarregamento=TempoCarregamento.create(props.tempoCarregamento).getValue();
    const ativo = (props.ativo ?? true);

   
      const camiao = new Camiao(
        {
          matricula: matricula,
          tara: tara,
          capacidadeCarga:capacidadeCarga,
          cargaBaterias:cargaBaterias,
          autonomia:autonomia,
          tempoCarregamento:tempoCarregamento,
          ativo:ativo

        },
        id,
      );

      return Result.ok<Camiao>(camiao);
    }
  }


