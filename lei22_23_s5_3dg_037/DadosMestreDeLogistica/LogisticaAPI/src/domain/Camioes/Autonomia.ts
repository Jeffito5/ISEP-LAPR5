/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { Distancia } from "../Rotas/Distancia";


interface AutonomiaProps {
  value: number;
}

export class Autonomia extends ValueObject<AutonomiaProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: AutonomiaProps) {
    super(props);
  }

  public static create (autonomia: number): Result<Autonomia> {
    const guardResult = Guard.againstNullOrUndefined(autonomia, 'autonomia');
    if (!guardResult.succeeded) {
      return Result.fail<Autonomia>(guardResult.message);
    } else {
      return Result.ok<Autonomia>(new Autonomia({ value: autonomia }))
    }
  }
}