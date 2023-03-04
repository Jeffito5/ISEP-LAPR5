import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/Users/User";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	getAll(): Promise<User[]>;
	findByEmail(email: string): Promise<User>;
	deleteUser(id:string);
}