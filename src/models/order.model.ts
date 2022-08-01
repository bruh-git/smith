import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

class OrderModel {
  public connection: Pool;

  public constructor(connection: Pool) {
    this.connection = connection;
  }

  getAll = async (): Promise<Order[]> => {
    const sql = `
    SELECT o.id, o.userId, JSON_ARRAYAGG(pr.id) AS productsIds
    FROM Trybesmith.Products AS pr
    INNER JOIN Trybesmith.Orders AS o
    ON o.id = pr.orderId
    GROUP BY o.id
    ORDER BY o.userId
    `;
    const [rows] = await this.connection.query(sql);
    return rows as Order[];
  };
}

export default OrderModel;