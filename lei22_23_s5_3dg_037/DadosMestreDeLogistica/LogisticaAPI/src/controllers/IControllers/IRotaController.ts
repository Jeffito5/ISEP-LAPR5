import { Request, Response, NextFunction } from 'express';

export default interface IRotaController  {
  createRota(req: Request, res: Response, next: NextFunction);
  updateRota(req: Request, res: Response, next: NextFunction);
  updateRotaArmazemOrigem(req: Request, res: Response, next: NextFunction);
  updateRotaArmazemDestino(req: Request, res: Response, next: NextFunction);
  getRota(req: Request, res: Response, next: NextFunction);
  getRotaByIdArmazemOrigem(req: Request, res: Response, next: NextFunction);
  getRotaByIdArmazemDestino(req: Request, res: Response, next: NextFunction);
  getAll(req: Request, res: Response, next: NextFunction);
  //deleteRota(req: Request, res: Response, next: NextFunction);
}