import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface DataNascimentoProps {
  value: string;
}

export class DataNascimento extends ValueObject<DataNascimentoProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: DataNascimentoProps) {
    super(props);
  }

  public static create (dataNascimento: string): Result<DataNascimento> {
    const guardResult = Guard.againstNullOrUndefined(dataNascimento, 'dataNascimento');
    if (!guardResult.succeeded) {
      return Result.fail<DataNascimento>(guardResult.message);
    } else {
      return Result.ok<DataNascimento>(new DataNascimento({ value: dataNascimento }))
    }
  }
}