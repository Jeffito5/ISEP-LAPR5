import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";
import { DataNascimento } from "./DataNascimento";
import { Email } from "./Email";
import { Nome } from "./Nome";
import { NumeroTelefone } from "./NumeroTelefone";
import { Password } from './Password';
import { TipoUser } from "./TipoUser";

interface UserProps {

  nome: Nome;
  email: Email;
  password: Password;
  dataNascimento: DataNascimento;
  numeroTelefone: NumeroTelefone;
  tipoUser: TipoUser;

}

export class User extends AggregateRoot<UserProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get nome(): Nome {
    return this.props.nome
  }

  get email(): Email {
    return this.props.email;
  }

  get password (): Password {
    return this.props.password;
  }

  get dataNascimento(): DataNascimento {
    return this.props.dataNascimento;
  }

  get numeroTelefone(): NumeroTelefone {
    return this.props.numeroTelefone;
  }

  get tipoUser(): TipoUser {
    return this.props.tipoUser;
  }

  set nome(value: Nome) {
    this.props.nome = value;
  }

  set email(value: Email) {
    this.props.email = value;
  }

  set password(value: Password) {
    this.props.password = value;
  }

  set dataNascimento(value: DataNascimento) {
    this.props.dataNascimento = value;
  }

  set numeroTelefone(value: NumeroTelefone) {
    this.props.numeroTelefone = value;
  }

  set tipoUser(value: TipoUser) {
    this.props.tipoUser = value;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: IUserDTO, id?: UniqueEntityID): Result<User> {

    const nome = Nome.create(props.nome).getValue();
    const email = Email.create(props.email).getValue();
    const password = Password.create(props.password, true).getValue();
    const dataNascimento = DataNascimento.create(props.dataNascimento).getValue();
    const numeroTelefone = NumeroTelefone.create(props.numeroTelefone).getValue();
    const tipoUser = TipoUser.create(props.tipoUser).getValue();

    const user = new User({
      nome: nome,
      email: email,
      password: password,
      dataNascimento: dataNascimento,
      numeroTelefone: numeroTelefone,
      tipoUser: tipoUser
    }, id);

    return Result.ok<User>(user);
  }
}