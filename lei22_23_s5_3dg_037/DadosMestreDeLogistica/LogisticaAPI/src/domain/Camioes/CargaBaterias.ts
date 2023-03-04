/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";


interface CargaBateriasProps {
  value: number;
}

export class CargaBaterias extends ValueObject<CargaBateriasProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CargaBateriasProps) {
    super(props);
  }

  public static create (cargaBaterias: number): Result<CargaBaterias> {
    const guardResult = Guard.againstNullOrUndefined(cargaBaterias, 'cargaBaterias');
    if (!guardResult.succeeded) {
      return Result.fail<CargaBaterias>(guardResult.message);
    } else {
      return Result.ok<CargaBaterias>(new CargaBaterias({ value: cargaBaterias }))
    }
  }
}