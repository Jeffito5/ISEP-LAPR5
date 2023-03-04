import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface EnergiaGastaProps {
  value: number;
}

export class EnergiaGasta extends ValueObject<EnergiaGastaProps> {
  get value (): number {
    return this.props.value;
  }
  
  private constructor (props: EnergiaGastaProps) {
    super(props);
  }

  public static create (energiaGasta: number): Result<EnergiaGasta> {
    const guardResult = Guard.againstNullOrUndefined(energiaGasta, 'energiaGasta');
    if (!guardResult.succeeded) {
      return Result.fail<EnergiaGasta>(guardResult.message);
    } else {
      return Result.ok<EnergiaGasta>(new EnergiaGasta({ value: energiaGasta }))
    }
  }
}