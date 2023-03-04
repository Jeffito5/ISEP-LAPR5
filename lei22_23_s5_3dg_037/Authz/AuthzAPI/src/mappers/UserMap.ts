import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { IUserPersistence } from "../dataschema/IUserPersistence";
import { User } from "../domain/Users/User";
import { IUserDTO } from "../dto/IUserDTO";
import { Email } from "../domain/Users/Email";
import { Password } from "../domain/Users/Password";
import { Container } from 'typedi';

export class UserMap extends Mapper<User> {

    public static toDTO( user: User): IUserDTO {
      return {

        id: user.id.toString(),
        nome: user.nome.value,
        email: user.email.value,
        password: user.password.value,
        dataNascimento: user.dataNascimento.value,
        numeroTelefone: user.numeroTelefone.value,
        tipoUser: user.tipoUser.value

      } as IUserDTO;
    }
  
    public static toDomain (user: any | Model<IUserPersistence & Document> ): User {
      const userOrError = User.create(
        user,
        new UniqueEntityID(user.domainId)
      );
  
      userOrError.isFailure ? console.log(userOrError.error) : '';
  
      return userOrError.isSuccess ? userOrError.getValue() : null;
    } 

    public static toPersistence (user: User): any {
      return {

        domainId: user.id.toString(),
        nome: user.nome.value,
        email: user.email.value,
        password: user.password.value,
        dataNascimento: user.dataNascimento.value,
        numeroTelefone: user.numeroTelefone.value,
        tipoUser: user.tipoUser.value
        
      }
    }
  }