import { Request, Response } from 'express';
import ProductService from '../services/productService';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.productService.getAll();
    return res.status(200).json(result);
  };

  public createProduct = async (req: Request, res: Response) => {
    this.productService.validate(req.body);
    const result = await this.productService.createProduct(req.body);
    return res.status(201).json(result);
  };
}

export default ProductController;