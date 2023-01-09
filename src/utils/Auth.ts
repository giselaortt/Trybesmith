import jwt from 'jsonwebtoken';
import IAuth from '../interface/authInterface';
import CustomError from './CustomError';

export default class JWTAuth implements IAuth {
  private secret = 'segredo';

  constructor() {
    this.secret = 'segredo';
  }

  public generateToken(id: number) {
    return jwt.sign({ id }, this.secret);
  }

  public verifyToken(token:string) {
    try {
      return jwt.verify(token, this.secret);
    } catch (e) {
      throw new CustomError('Invalid token', 401);
    }
  }
}