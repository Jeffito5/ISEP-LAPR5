/* eslint-disable prettier/prettier */

import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";


interface CapacidadeCargaProps {
  value: number;
}

export class CapacidadeCarga extends ValueObject<CapacidadeCargaProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: CapacidadeCargaProps) {
    super(props);
  }

  public static create (capacidadeCarga: number): Result<CapacidadeCarga> {
    const guardResult = Guard.againstNullOrUndefined(capacidadeCarga, 'capacidadeCarga');
    if (!guardResult.succeeded) {
      return Result.fail<CapacidadeCarga>(guardResult.message);
    } else {
      return Result.ok<CapacidadeCarga>(new CapacidadeCarga({ value: capacidadeCarga }))
    }
  }
}