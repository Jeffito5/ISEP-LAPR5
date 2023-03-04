import { Result } from "../../core/logic/Result";
import { IEntregaDTO } from "../../dto/IEntregaDTO";

export default interface IEntregaService  {
    getEntregaByDate(dataEntrega:string): Promise<Result<IEntregaDTO>>;
}