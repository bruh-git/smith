import { Router } from 'express';

import OrderController from '../controllers/order.controller';

const orderRouter = Router();

const orderController = new OrderController();

orderRouter.get('/orders', (req, res) => orderController.getAll(req, res));

export default orderRouter;