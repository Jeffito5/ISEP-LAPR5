/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface NumeroTelefoneProps {
  value: number;
}

export class NumeroTelefone extends ValueObject<NumeroTelefoneProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: NumeroTelefoneProps) {
    super(props);
  }

  public static create (numeroTelefone: number): Result<NumeroTelefone> {
    const guardResult = Guard.againstNullOrUndefined(numeroTelefone, 'numeroTelefone');
    if (!guardResult.succeeded) {
      return Result.fail<NumeroTelefone>(guardResult.message);
    } else {
      return Result.ok<NumeroTelefone>(new NumeroTelefone({ value: numeroTelefone }))
    }
  }
}