import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';

import { IUserPersistence } from '../dataschema/IUserPersistence';
import { User } from '../domain/Users/User';
import { UserMap } from '../mappers/UserMap';
import IUserRepo from '../services/IRepos/IUserRepo';
import { Email } from '../domain/Users/Email';
import { NumeroTelefone } from '../domain/Users/NumeroTelefone';
import { Nome } from '../domain/Users/Nome';
import { DataNascimento } from '../domain/Users/DataNascimento';
import { Result } from '../core/logic/Result';
import { IUserDTO } from '../dto/IUserDTO';



@Service()
export default class UserRepo implements IUserRepo {
  
  private models: any;

  constructor(
    @Inject('userSchema') private userSchema: Model<IUserPersistence & Document>,
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async exists(user: User): Promise<boolean> {

    const idX = user.id instanceof User ? (<User>user.id).id.toValue() : user.id;

    const query = { domainId: idX };
    const userDocument = await this.userSchema.findOne(query as FilterQuery<IUserPersistence & Document>);

    return !!userDocument === true;
  }

  public async save(user: User): Promise<User> {
    const query = { domainId: user.id.toString() };

    const userDocument = await this.userSchema.findOne(query);

    try {
      if (userDocument === null) {
        const rawUser: any = UserMap.toPersistence(user);

        const userCreated = await this.userSchema.create(rawUser);

        return UserMap.toDomain(userCreated);
      } else {
        userDocument.nome = user.nome.value;
        userDocument.email = user.email.value;
        userDocument.password = user.password.value;
        userDocument.dataNascimento = user.dataNascimento.value;
        userDocument.numeroTelefone = user.numeroTelefone.value;
        userDocument.tipoUser = user.tipoUser.value;
        await userDocument.save();

        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  public async getAll(): Promise<User[]> {
    var allUsersReturn: User[] = [];
    const allUsers = await this.userSchema.find({});
    try {
      for (var i = 0; i < allUsers.length; i++) {
        allUsersReturn.push(await UserMap.toDomain(allUsers[i]))
      }
      return allUsersReturn;
    } catch (err) {
      throw err;
    }
  }

 /* public async findByEmail(email: string): Promise<User> {
    const query = { email: email.toString() };
    const userRecord = await this.userSchema.findOne(query);

    if (userRecord != null) {
      return UserMap.toDomain(userRecord);
    }
    else
      return null;
  }*/

  public async deleteUser(email: string): Promise<User> {
    const userOrNull = this.findById(email);
      
      if (userOrNull===null)
        return null;
        
    try {

      (await userOrNull).numeroTelefone = NumeroTelefone.create(999999999).getValue();
      (await userOrNull).email = Email.create("ANONIMIZADO").getValue();
      (await userOrNull).nome = Nome.create("ANONIMIZADO").getValue();
      (await userOrNull).dataNascimento = DataNascimento.create("1/1/1111").getValue();

      return this.save(await userOrNull);

    } catch (err) {
      throw err;
    }
  }

  public async findById(userEmail: Email | string): Promise<User> {

    const query = { email: userEmail };
    const userRecord = await this.userSchema.findOne(query as FilterQuery<IUserPersistence & Document>);

    console.log(userRecord);
    if (userRecord != null) {
      return UserMap.toDomain(userRecord);
    }
    else
    return null;
  }

  public async findByEmail(email: Email | string): Promise<User> {
    const query = { email: email.toString() };
    const userRecord = await this.userSchema.findOne(query);

    if (userRecord != null) {
      return UserMap.toDomain(userRecord);
    }
    else
      return null;
  }
}