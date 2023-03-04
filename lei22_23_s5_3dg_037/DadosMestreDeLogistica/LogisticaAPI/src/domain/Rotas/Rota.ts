import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { IRotaDTO } from "../../dto/IRotaDTO";
import { Distancia } from './Distancia';
import { EnergiaGasta } from './EnergiaGasta';
import { IdArmazem } from './IdArmazem';
import { TempoExtra } from './TempoExtra';
import { TempoMaximo } from './TempoMaximo';



interface RotaProps {
    idArmazemOrigem: IdArmazem;
    idArmazemDestino: IdArmazem;
    distancia: Distancia;
    energiaGasta: EnergiaGasta;
    tempoMaximo: TempoMaximo;
    tempoExtra: TempoExtra;
  }

  export class Rota extends AggregateRoot<RotaProps> {
    get id (): UniqueEntityID {
      return this._id;
    }

    get idArmazemOrigem (): IdArmazem {
      return this.props.idArmazemOrigem;
    }
  
    get idArmazemDestino (): IdArmazem {
      return this.props.idArmazemDestino
    }
  
    get distancia (): Distancia {
      return this.props.distancia;
    }
  
    get energiaGasta (): EnergiaGasta {
      return this.props.energiaGasta;
    }
  
    get tempoMaximo (): TempoMaximo {
      return this.props.tempoMaximo;
    }

    get tempoExtra(): TempoExtra {
      return this.props.tempoExtra;
    }

    set idArmazemOrigem(value: IdArmazem) {
      this.props.idArmazemOrigem = value;
    }

    set idArmazemDestino(value: IdArmazem) {
      this.props.idArmazemDestino = value;
    }

    set distancia(value: Distancia) {
      this.props.distancia = value;
    }

    set energiaGasta(value: EnergiaGasta) {
      this.props.energiaGasta = value;
    }

    set tempoMaximo(value: TempoMaximo) {
      this.props.tempoMaximo = value;
    }

    set tempoExtra(value: TempoExtra) {
      this.props.tempoExtra = value;
    }

    private constructor (props: RotaProps, id?: UniqueEntityID) {
      super(props, id);
    }
  
    public static create (props: IRotaDTO, id?: UniqueEntityID): Result<Rota> {
  
      // const guardedProps = [
      //   { argument: props.idArmazemOrigem, argumentName: 'idArmazemOrigem' },
      //   { argument: props.idArmazemDestino, argumentName: 'idArmazemDestino' },
      //   { argument: props.distancia, argumentName: 'distancia' },
      //   { argument: props.energiaGasta, argumentName: 'energiaGasta' },
      //   { argument: props.tempoMaximo, argumentName: 'tempoMaximo' },
      //   { argument: props.tempoExtra, argumentName: 'tempoExtra' }
      // ];
      
      const IdArmazemOrigem = IdArmazem.create(props.idArmazemOrigem).getValue();
      const IdArmazemDestino = IdArmazem.create(props.idArmazemDestino).getValue();
      const distancia = Distancia.create(props.distancia).getValue();
      const energiaGasta = EnergiaGasta.create(props.energiaGasta).getValue();
      const tempoMaximo= TempoMaximo.create(props.tempoMaximo).getValue();
      const tempoExtra = TempoExtra.create(props.tempoExtra).getValue();

      // const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
  
      // if (!guardResult.succeeded) {
      //   return Result.fail<Rota>(guardResult.message)
      // }     
      // else {
        const rota = new Rota({
          idArmazemOrigem: IdArmazemOrigem,
          idArmazemDestino: IdArmazemDestino,
          distancia: distancia,
          energiaGasta: energiaGasta,
          tempoMaximo: tempoMaximo,
          tempoExtra: tempoExtra
        }, id);
  
        return Result.ok<Rota>(rota);
      //}
    }
  }