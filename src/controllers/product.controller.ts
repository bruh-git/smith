import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import ProductService from '../services/product.service';

class ProductController {
  public service: ProductService;

  constructor(service: ProductService = new ProductService()) {
    this.service = service;
  }

  public async getAll(req: Request, res: Response): Promise<Response> {
    const products = await this.service.getAll();
    return res.status(200).json(products);
  }

  public async create(req: Request, res: Response) {
    const product = req.body;

    const productCreated = await this.service.create(product);
    res.status(StatusCodes.CREATED).json(productCreated);
  }
}

export default ProductController;