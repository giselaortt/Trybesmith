import { Request, Response } from 'express';
import UserService from '../services/userService';
import JWTAuth from '../utils/Auth';

export default class UserController {
  constructor(private userService = new UserService(new JWTAuth())) { }

  public createUser = async (req: Request, res: Response) => {
    const result = await this.userService.createUser(req.body);
    return res.status(201).json(result);
  };

  public loginUser = async (req: Request, res: Response) => {
    const result = await this.userService.loginUser(req.body);
    return res.status(200).json(result);
  };
}