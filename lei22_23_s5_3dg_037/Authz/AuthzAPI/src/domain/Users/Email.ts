import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: EmailProps) {
    super(props);
  }

  public static create (email: string): Result<Email> {
    const guardResult = Guard.againstNullOrUndefined(email, 'email');
    if (!guardResult.succeeded) {
      return Result.fail<Email>(guardResult.message);
    } else {
      return Result.ok<Email>(new Email({ value: email }))
    }
  }
}