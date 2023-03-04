import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";


interface TempoMaximoProps {
  value: number;
}

export class TempoMaximo extends ValueObject<TempoMaximoProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: TempoMaximoProps) {
    super(props);
  }

  public static create (tempoMaximo: number): Result<TempoMaximo> {
    const guardResult = Guard.againstNullOrUndefined(tempoMaximo, 'tempoMaximo');
    if (!guardResult.succeeded) {
      return Result.fail<TempoMaximo>(guardResult.message);
    } else {
      return Result.ok<TempoMaximo>(new TempoMaximo({ value: tempoMaximo }))
    }
  }
}