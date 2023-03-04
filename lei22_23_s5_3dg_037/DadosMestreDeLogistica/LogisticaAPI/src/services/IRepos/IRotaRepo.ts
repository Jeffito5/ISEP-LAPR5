import { Repo } from "../../core/infra/Repo";
import { Rota } from "../../domain/Rotas/Rota";

import { UniqueEntityID } from '../../core/domain/UniqueEntityID';


export default interface IRotaRepo extends Repo<Rota> {
	save(rota: Rota): Promise<Rota>;
	findByDomainId (id: UniqueEntityID | string): Promise<Rota>;
	findByIdArmazemOrigem (idArmazemOrigem: string): Promise<Rota>;
	findByIdArmazemDestino (idArmazemDestino: string): Promise<Rota>;
	getAll():Promise<Rota[]>;
}