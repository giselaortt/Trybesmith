import { Request, Response } from 'express';
import OrderService from '../services/orderService';
import Auth from '../utils/Auth';
import CustomError from '../utils/CustomError';

const auth = new Auth();

export default class OrderController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (req: Request, res: Response) => {
    const result = await this.orderService.getAll();
    return res.status(200).json(result);
  };

  public createOrder = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
        
    if (!authorization) {
      throw new CustomError('Token not found', 401);
    }

    const payload = auth.verifyToken(authorization) as { id: number };

    if (payload.id) {
      const order = await this.orderService.createOrder(
        { productsIds: req.body.productsIds, userId: payload.id },
      );
      res.status(201).json(order);
    }
  };
}