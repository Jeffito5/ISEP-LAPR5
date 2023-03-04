/* eslint-disable prettier/prettier */
import { Result } from "../../core/logic/Result";
import { ICamiaoDTO } from "../../dto/ICamiaoDTO";

/* eslint-disable prettier/prettier */
export default interface ICamiaoService  {
    createCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
    updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
    getAll():Promise<ICamiaoDTO[]>;
    getCamiao(camiaoId: string): Promise<Result<ICamiaoDTO>>;
  }
  