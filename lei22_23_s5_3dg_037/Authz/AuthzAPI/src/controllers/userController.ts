import { Request, Response, NextFunction } from 'express';
import { Inject, Service, Container } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import { IUserDTO } from '../dto/IUserDTO';
import IUserController from './IControllers/IUserController';
import IUserService from '../services/IServices/IUserService';
import winston from 'winston';
import UserService from '../services/userService';

@Service()
export default class UserController implements IUserController /* TODO: extends ../core/infra/BaseController */ {
  
  constructor(
      @Inject(config.services.user.name) private userServiceInstance : IUserService
  ) {}

  public async createUser(req: Request, res: Response, next: NextFunction) {
    
    try {
      
      const userOrError = await this.userServiceInstance.createUser(req.body as IUserDTO) as Result<IUserDTO>;
        
      if (userOrError.isFailure) {
        return res.status(402).send(userOrError.error);
      }

      const userDTO = userOrError.getValue();
      return res.json( userDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
        var allUsers= await this.userServiceInstance.getAll();
        if (!allUsers) {
            return res.status(402).send();
        }
        
        return res.status(201).send(allUsers);
    } catch (e) {
        console.log(e);
        return res.status(400).send();
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-In endpoint with body: %o', req.body)
    try {
      const { email, password } = req.body;
      const userServiceInstance = Container.get(UserService);
      const result = await userServiceInstance.SignIn(email, password);
      
      if( result.isFailure )
        return res.json().status(403);
  
      const { userDTO, token } = result.getValue();
      return res.json({ userDTO, token }).status(200);
  
    } catch (e) {
      logger.error('🔥 error: %o',  e );
      return next(e);
    }
  }
  
  public async logOut(req: Request, res: Response, next: NextFunction) {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  }

  async deleteUser(req: Request, res: Response, err: NextFunction) {
    try {
      var deletedUser= await this.userServiceInstance.deleteUser(req.params.email);
      
      if (deletedUser.isFailure) {
          return res.status(404).send("Utilizador não encontrado");
      }
      
      return res.status(202).send();
    } catch (e) {
      console.log(e);
      return res.status(400).send();
    }
  }


  public async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      let email = req.url.substring(5, req.url.length);

      const utilizadorOuErro = (await this.userServiceInstance.getUserByEmail(email)) as Result<IUserDTO>;

      if (utilizadorOuErro.isFailure) {
        res.status(404).send();
      }

      const utilizadorDTO = utilizadorOuErro.getValue();

      return res.status(201).json(utilizadorDTO);
    } catch (e) {
      return next(e);
    }
  }
}