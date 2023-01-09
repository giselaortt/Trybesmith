import { 
  Pool, 
  ResultSetHeader,
} from 'mysql2/promise';
import IProduct from '../interface/productInterface';

class ProductModel {
  public connection : Pool;

  constructor(connection : Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IProduct[]> {
    const result = await this.connection.execute('select * from Trybesmith.Products');
    const [rows] = result;
    return rows as IProduct[];
  }

  public async createProduct(product : IProduct): Promise<IProduct> {
    const result = await this.connection.execute<ResultSetHeader>(
      'insert into Trybesmith.Products (name, amount) value (?, ?)', 
      [product.name, product.amount],
    );
    const [rows] = result;
    const { insertId } = rows;
    return { id: insertId, ...product };
  }

  public async getByOrderId(orderId: number): Promise<IProduct[]> {
    const [rows] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Products WHERE orderId = ?', 
      [orderId],
    );
    const products = rows as IProduct[];
    return products;
  }

  public async updateOrder(product: Omit<IProduct, 'name' | 'amount'>) {    
    await this.connection.execute(
      'update Trybesmith.Products set orderId = ? where id = ?',
      [product.orderId, product.id],
    );
  }
}

export default ProductModel;