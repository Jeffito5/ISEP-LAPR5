import { Result } from "../../core/logic/Result";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService  {
  createUser(userDTO: IUserDTO): Promise<Result<IUserDTO>>;
  getAll():Promise<IUserDTO[]>;
  SignIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>>;
  deleteUser(userEmail:string):Promise<Result<IUserDTO>>;
  getUserByEmail(email:string):Promise<Result<IUserDTO>>;
}