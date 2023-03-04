import { Request, Response, NextFunction } from 'express';

export default interface ICamiaoController  {
  createPlaneamento(req: Request, res: Response, next: NextFunction);
}