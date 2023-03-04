/* eslint-disable prettier/prettier */
import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";


interface MatriculaProps {
  value: string;
}

export class Matricula extends ValueObject<MatriculaProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: MatriculaProps) {
    super(props);
  }

  public static create (matricula: string): Result<Matricula> {
    //const guardResult = Guard.againstNullOrUndefined(matricula, 'matricula');
    //if (!guardResult.succeeded) {
     // return Result.fail<Matricula>(guardResult.message);
    //} else {
      return Result.ok<Matricula>(new Matricula({ value: matricula }))
    }
  //}
}