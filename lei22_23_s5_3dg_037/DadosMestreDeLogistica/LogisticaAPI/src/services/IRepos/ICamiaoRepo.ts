/* eslint-disable prettier/prettier */
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Repo } from "../../core/infra/Repo";
import { Camiao } from "../../domain/Camioes/Camiao";
import { CamiaoId } from "../../domain/Camioes/CamiaoId";

/* eslint-disable prettier/prettier */
export default interface ICamiaoRepo extends Repo<Camiao> {
    findByDomainId(id: UniqueEntityID | string): Promise<Camiao>;
	save(camiao: Camiao): Promise<Camiao>;
	getAll():Promise<Camiao[]>
}