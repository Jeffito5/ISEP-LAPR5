import { Result } from "../../core/logic/Result";
import { IRotaDTO } from "../../dto/IRotaDTO";


export default interface IRotaService  {
  createRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>>;
  updateRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>>;
  updateRotaArmazemOrigem(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>>;
  updateRotaArmazemDestino(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>>;
  getRota (id: string): Promise<Result<IRotaDTO>>;
  getAll():Promise<IRotaDTO[]>;
  getRotaByIdArmazemOrigem (idArmazemOrigem: string): Promise<Result<IRotaDTO>>;
  getRotaByIdArmazemDestino (idArmazemDestino: string): Promise<Result<IRotaDTO>>;
}