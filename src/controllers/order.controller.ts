import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import OrderService from '../services/order.service';

class OrderController {
  public service: OrderService;

  constructor(service: OrderService = new OrderService()) {
    this.service = service;
  }

  public async getAll(_req: Request, res: Response): Promise<Response> {
    const orders = await this.service.getAll();
    return res.status(StatusCodes.OK).json(orders);
  }
}

export default OrderController;