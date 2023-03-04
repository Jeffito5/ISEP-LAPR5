import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface IdArmazemProps {
  value: string;
}

export class IdArmazem extends ValueObject<IdArmazemProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: IdArmazemProps) {
    super(props);
  }

  public static create (idArmazem: string): Result<IdArmazem> {
    const guardResult = Guard.againstNullOrUndefined(idArmazem, 'idArmazem');
    if (!guardResult.succeeded) {
      return Result.fail<IdArmazem>(guardResult.message);
    } else {
      return Result.ok<IdArmazem>(new IdArmazem({ value: idArmazem }))
    }
  }
}