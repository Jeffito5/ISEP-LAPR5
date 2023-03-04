import { Result } from "../../core/logic/Result";
import { IPlaneamentoDTO } from "../../dto/IPlaneamentoDTO";
import { IEntregaDTO } from "../../dto/IEntregaDTO";

export default interface IPlaneamentoService  {
    createPlaneamento(idCamiao:string,opIndex:string,dataEntrega:string): Promise<IPlaneamentoDTO>;
}