import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";


interface TempoExtraProps {
  value: number;
}

export class TempoExtra extends ValueObject<TempoExtraProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: TempoExtraProps) {
    super(props);
  }

  public static create (tempoExtra: number): Result<TempoExtra> {
    const guardResult = Guard.againstNullOrUndefined(tempoExtra, 'tempoExtra');
    if (!guardResult.succeeded) {
      return Result.fail<TempoExtra>(guardResult.message);
    } else {
      return Result.ok<TempoExtra>(new TempoExtra({ value: tempoExtra }))
    }
  }
}