import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface NomeProps {
  value: string;
}

export class Nome extends ValueObject<NomeProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: NomeProps) {
    super(props);
  }

  public static create (nome: string): Result<Nome> {
    const guardResult = Guard.againstNullOrUndefined(nome, 'nome');
    if (!guardResult.succeeded) {
      return Result.fail<Nome>(guardResult.message);
    } else {
      return Result.ok<Nome>(new Nome({ value: nome }))
    }
  }
}