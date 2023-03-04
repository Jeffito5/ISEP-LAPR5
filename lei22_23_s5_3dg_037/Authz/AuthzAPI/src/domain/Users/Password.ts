import * as bcrypt from 'bcrypt-nodejs';
import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface PasswordProps {
  value: string;
  hashed?: boolean;
}

export class Password extends ValueObject<PasswordProps> {
  
  get value (): string {
    return this.props.value;
  }

  get hashed (): boolean {
    return this.props.hashed;
  }

  private constructor (props) {
    super(props)
  }

    /**
   * @method comparePassword
   * @desc Compares as plain-text and hashed password.
   */

  public async comparePassword (plainTextPassword: string): Promise<boolean> {
    let hashed: string;
    if (this.isAlreadyHashed()) {
      hashed = this.props.value;
      return this.bcryptCompare(plainTextPassword, hashed);
    } else {
      return this.props.value === plainTextPassword;
    }
  }

  private bcryptCompare (plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, hashed, (err, compareResult) => {
        if (err) return resolve(false);
        return resolve(compareResult);
      })
    })
  }

  public isAlreadyHashed (): boolean {
    return this.props.hashed;
  }
  
  private hashPassword (password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, null, null, (err, hash) => {
        if (err) return reject(err);
        resolve(hash)
      })
    })
  }

  public getHashedValue (): Promise<string> {
    return new Promise((resolve) => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value);
      } else {
        return resolve(this.hashPassword(this.props.value))
      }
    })
  }

  public static isAppropriateLength (value: string): boolean {
    return value.length >= 8;
  }

  public static create (value: string, hashed: boolean): Result<Password> {
    const propsResult = Guard.againstNullOrUndefined(value, 'password');

    if (!propsResult.succeeded) {
      return Result.fail<Password>(propsResult.message);
    } else {

      if (!hashed) {
        if (!this.isAppropriateLength(value)
        ) {
          return Result.fail<Password>('Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min].');
        }
      }

      return Result.ok<Password>(new Password({
        value: value,
        hashed: !!hashed === true
      }));
    }
  }
}