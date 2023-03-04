import { Request, Response, NextFunction } from 'express';

export default interface IUserController  {
  createUser(req: Request, res: Response, next: NextFunction);
  getAll(req: Request, res: Response, next: NextFunction);
  signIn(req: Request, res: Response, next: NextFunction);
  logOut(req: Request, res: Response, next: NextFunction);
  deleteUser(req: Request, res: Response, next: NextFunction);
  getUserByEmail(req: Request, res: Response, next: NextFunction);
}