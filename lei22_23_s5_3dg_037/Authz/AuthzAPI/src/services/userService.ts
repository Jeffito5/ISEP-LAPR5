import { Service, Inject } from 'typedi';
import config from "../../config";
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { Result } from "../core/logic/Result";
import { IUserDTO } from '../dto/IUserDTO';
import { UserMap } from '../mappers/UserMap';
import IUserRepo from './IRepos/IUserRepo';
import IUserService from './IServices/IUserService';
import { User } from '../domain/Users/User';
import { randomBytes } from 'crypto';
import { Password } from '../domain/Users/Password';

@Service()
export default class UserService implements IUserService {
  constructor(
    @Inject(config.repos.user.name) private userRepo: IUserRepo,
    @Inject('logger') private logger,
  ) { }

  public async getAll(): Promise<IUserDTO[]> {
    try {
      var allUserResult: IUserDTO[] = [];
      const allUsers = await this.userRepo.getAll();

      if (allUsers === null) {
        return null;
      }
      for (var i = 0; i < allUsers.length; i++) {
        allUserResult.push(await UserMap.toDTO(allUsers[i]));
      }
      return allUserResult;
    } catch (e) {
      throw e;
    }
  }

  public async createUser(userDTO: IUserDTO): Promise<Result<IUserDTO>> {
    try {
      const userDocument = await this.userRepo.findByEmail( userDTO.email );
      const found = !!userDocument;
  
      if (found) {
        return Result.fail<IUserDTO>("Este email já existe.");
      }

      const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userDTO.password, { salt });
      this.logger.silly('Creating user db record');

      const userOrError = await User.create({
      
      id: userDTO.id,
      nome: userDTO.nome,
      email: userDTO.email,
      password: hashedPassword,
      dataNascimento: userDTO.dataNascimento,
      numeroTelefone: userDTO.numeroTelefone,
      tipoUser: userDTO.tipoUser,

      });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userResult);

      this.logger.silly('Sending welcome email');
      
      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO( userResult ) as IUserDTO;
      
      return Result.ok<IUserDTO>(userDTOResult)
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
  
  public async SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>> {

    const user = await this.userRepo.findByEmail( email );

    if (!user) {
      throw new Error('Utilizador não registado');
    }

    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(user.password.value, password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(user) as string;

      const userDTO = UserMap.toDTO( user ) as IUserDTO;
      return Result.ok<{userDTO: IUserDTO, token: string}>( {userDTO: userDTO, token: token} );
    } else {
      throw new Error('Password inválida');
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    this.logger.silly(`Sign JWT for userId: ${user._id}`);

    const id = user.id.toString();
    const nome = user.nome.value;
    const email = user.email.value;
    const dataNascimento = user.dataNascimento.value;
    const numeroTelefone = user.numeroTelefone.value;
    const tipoUser = user.tipoUser.value;

    return jwt.sign(
      {
        id: id,
        nome: nome,
        email: email, // We are gonna use this in the middleware 'isAuth'
        dataNascimento: dataNascimento,
        numeroTelefone: numeroTelefone,
        tipoUser: tipoUser,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }

  public async deleteUser(email: string) :Promise<Result<IUserDTO>>{
    try {

      const userOrError = await this.userRepo.deleteUser(email);

      if (userOrError===null || userOrError.isFailure) {
        return Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError; //as IUserDTO/*.getValue()*/;

      //const userDTOResult = UserMap.toDTO() as IUserDTO;
      return Result.ok<IUserDTO>(userResult._value as IUserDTO);
    } catch (e) {
      throw e;
    }
  }

  public async getUserByEmail(email: string): Promise<Result<IUserDTO>> {
    const user = await this.userRepo.findByEmail(email);

    const userDTO = UserMap.toDTO(user) as IUserDTO;

    return Result.ok<IUserDTO>(userDTO);
  }

}