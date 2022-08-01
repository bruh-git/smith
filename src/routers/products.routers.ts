import { Router } from 'express';

import ProductController from '../controllers/product.controller';
import validationProduct from '../middlewares/products.middleware';

const productRouter = Router();

const productController = new ProductController();

productRouter.post(
  '/products',
  validationProduct,
  (req, res) => productController.create(req, res),
);

productRouter.get('/products', (req, res) => productController.getAll(req, res));

export default productRouter;