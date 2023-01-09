import { Pool, ResultSetHeader } from 'mysql2/promise';
import IOrder from '../interface/orderInterface';
import IProduct from '../interface/productInterface';
import ProductModel from './productModel';

const serializeProductsIds = (products: IProduct[]) => products.map(({ id }) => id);

export default class UserModel {
  public connection : Pool;

  private productModel: ProductModel;

  constructor(connection : Pool) {
    this.connection = connection;
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<IOrder[]> {
    const [result] = await this.connection.execute('select * from Trybesmith.Orders');
    const orders = result as IOrder[];

    const ordersWithProducts = await Promise.all(
      orders.map(
        async ({ id, ...rest }) => id && ({
          id,
          ...rest,
          productsIds: serializeProductsIds(await this.productModel.getByOrderId(id)),
        }),
      ),
    );
    return ordersWithProducts as IOrder[];
  }

  public async createOrder(order: Omit<IOrder, 'id'>): Promise<Omit<IOrder, 'id'>> {
    const [result] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [order.userId],
    );

    const { insertId } = result;
    
    await Promise.all(
      order.productsIds.map(
        async (id) => {
          this.productModel.updateOrder({ id, orderId: insertId });
        },
      ),
    );

    return order;
  }
}