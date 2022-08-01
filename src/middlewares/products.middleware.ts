// ./middlewares/books.middleware.ts

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Product from '../interfaces/product.interface';

const properties = ['name', 'amount', 'orderId'];

function validateProperties(product: Product): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(product, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateValues(product: Product): [boolean, string | null] {
  const entries = Object.entries(product);
  for (let i = 0; i < entries.length; i += 1) {
    const [property, value] = entries[i];
    if (!value) {
      return [false, property];
    }
  }
  return [true, null];
}

function validationProduct(req: Request, res: Response, next: NextFunction) {
  const product: Product = req.body;

  let [valid, property] = validateProperties(product);

  if (!valid) {
    return res.status(StatusCodes.BAD_REQUEST).send(
      `O campo ${property} é obrigatório.`,
    );
  }

  [valid, property] = validateValues(product);

  if (!valid) {
    return res.status(StatusCodes.BAD_REQUEST).send(
      `O campo ${property} não pode ser nulo ou vazio.`,
    );
  }

  next();
}

export default validationProduct;