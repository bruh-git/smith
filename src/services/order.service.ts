import connection from '../models/connection';

import OrderModel from '../models/order.model';

import Order from '../interfaces/order.interface';

class OrderService {
  public orderModel : OrderModel;

  constructor(model: OrderModel = new OrderModel(connection)) {
    this.orderModel = model;
  }

  getAll = async (): Promise<Order[]> => this.orderModel.getAll();
  
  create = async (userId: number) => {
    const id = await this.orderModel.create(userId);
    return id;
  };
}

export default OrderService;