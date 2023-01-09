import Joi from 'joi';
import IProduct from '../interface/productInterface';
import { ProductSchema } from '../utils/Joi.schema';
import connection from '../models/connection';
import ProductModel from '../models/productModel';

class ProductService {
  public productModel : ProductModel;

  public schema: Joi.Schema;

  constructor() {
    this.productModel = new ProductModel(connection);
    this.schema = ProductSchema;
  }

  public validate(body: IProduct) {
    const { error } = this.schema.validate(body);
    if (error) {
      throw error;
    }
  }

  public async getAll(): Promise<IProduct[]> {
    return this.productModel.getAll();
  }
    
  public async createProduct(product : IProduct): Promise<IProduct> {
    return this.productModel.createProduct(product);
  }
}

export default ProductService;