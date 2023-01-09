import jwt from 'jsonwebtoken';

export default interface IAuth {
  generateToken: (username: number) => string;
  verifyToken: (token: string) => string | jwt.JwtPayload
}