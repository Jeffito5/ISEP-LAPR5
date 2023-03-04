/* eslint-disable prettier/prettier */

import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";


interface TaraProps {
  value: number;
}

export class Tara extends ValueObject<TaraProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: TaraProps) {
    super(props);
  }

  public static create (tara: number): Result<Tara> {
    const guardResult = Guard.againstNullOrUndefined(tara, 'tara');
    if (!guardResult.succeeded) {
      return Result.fail<Tara>(guardResult.message);
    } else {
      return Result.ok<Tara>(new Tara({ value: tara }))
    }
  }
}