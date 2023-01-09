import Joi from 'joi';
import IUser from '../interface/userInterface';
import IAuth from '../interface/authInterface';
import { UserSchema, LoginSchema } from '../utils/Joi.schema';
import connection from '../models/connection';
import UserModel from '../models/userModel';
import CustomError from '../utils/CustomError';

export default class UserService {
  public userModel : UserModel;

  public createSchema: Joi.Schema;

  public loginSchema: Joi.Schema;

  private auth: IAuth;

  constructor(auth: IAuth) {
    this.userModel = new UserModel(connection);
    this.createSchema = UserSchema;
    this.loginSchema = LoginSchema;
    this.auth = auth;
  }

  static validate(body: Partial<IUser>, schema: Joi.Schema) {
    const { error } = schema.validate(body);
    if (error) {
      throw error;
    }
  }
    
  public async createUser(user : IUser): Promise<object> {
    UserService.validate(user, this.createSchema);
    const id = await this.userModel.createUser(user);
    const token = this.auth.generateToken(id);
    return { token };
  }

  public async loginUser(user: Omit<IUser, 'class' | 'level'>): Promise<object> {
    UserService.validate(user, this.loginSchema);

    const [result] = await this.userModel.loginUser(user);

    if (result && result.id) {
      return { token: this.auth.generateToken(result.id) };
    }

    throw new CustomError('Username or password invalid', 401);
  }
}