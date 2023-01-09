import Joi from 'joi';
import IOrder from '../interface/orderInterface';
import { OrderSchema } from '../utils/Joi.schema';
import connection from '../models/connection';
import OrderModel from '../models/orderModel';

export default class OrderService {
  public orderModel : OrderModel;

  public orderSchema: Joi.Schema;

  constructor() {
    this.orderModel = new OrderModel(connection);
    this.orderSchema = OrderSchema;
  }

  static validate(body: Partial<IOrder>, schema: Joi.Schema) {
    const { error } = schema.validate(body);
    if (error) {
      throw error;
    }
  }

  public async getAll(): Promise<IOrder[]> {
    return this.orderModel.getAll();
  }
    
  public async createOrder(order: Omit<IOrder, 'id'>): Promise<Omit<IOrder, 'id'>> {
    OrderService.validate(order, this.orderSchema);
    return this.orderModel.createOrder(order);
  }
}