import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interface';

class ProductModel {
  public connection: Pool;

  public constructor(connection: Pool) {
    this.connection = connection;
  }

  getAll = async (): Promise<Product[]> => {
    const sql = 'SELECT * FROM Trybesmith.Products';
    const [rows] = await this.connection.query(sql);
    return rows as Product[];
  };

  create = async (product: Product): Promise<Product> => {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  };
}

export default ProductModel;