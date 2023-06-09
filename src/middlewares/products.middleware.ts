import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Product from '../interfaces/product.interface';

const properties = ['name', 'amount'];

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
    if (typeof value !== 'string') {
      return [false, property];
    }
  }
  return [true, null];
}

function validateLength(product: Product): [boolean, string | null] {
  const entries = Object.entries(product);
  for (let i = 0; i < properties.length; i += 1) {
    const [property, value] = entries[i];
    if (value.length < 2) {
      return [false, property];
    }
  }
  return [true, null];
}

function validationProduct(req: Request, res: Response, next: NextFunction) {
  const product: Product = req.body;

  let [valid, property] = validateProperties(product);

  if (!valid) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: `"${property}" is required` });
  }
  [valid, property] = validateValues(product);
  if (!valid) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: `"${property}" must be a string` });
  }
  [valid, property] = validateLength(product);
  if (!valid) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message: `"${property}" length must be at least 3 characters long` });
  }

  next();
}

export default validationProduct;