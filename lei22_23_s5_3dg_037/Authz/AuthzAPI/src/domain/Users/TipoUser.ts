import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface TipoUserProps {
  value: string;
}

export class TipoUser extends ValueObject<TipoUserProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: TipoUserProps) {
    super(props);
  }

  public static create (tipoUser: string): Result<TipoUser> {
    const guardResult = Guard.againstNullOrUndefined(tipoUser, 'tipoUser');
    if (!guardResult.succeeded) {
      return Result.fail<TipoUser>(guardResult.message);
    } else {
      return Result.ok<TipoUser>(new TipoUser({ value: tipoUser }))
    }
  }
}