import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../interfaces/user.interface';

const properties = ['username', 'classe', 'level', 'password'];

function validateProperties(user: User): [boolean, string | null] {
  for (let i = 0; i < properties.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
      return [false, properties[i]];
    }
  }
  return [true, null];
}

function validateLength(user: User): [boolean, string | null, number | null] {
  const { username, classe, password } = user;

  if (username.length <= 2) {
    return [false, 'username', 3];
  }
  if (classe.length <= 2) {
    return [false, 'classe', 3];
  }
  if (password.length <= 8) {
    return [false, 'password', 8];
  }
  return [true, null, null];
}

function validateString(user: User): [boolean, string | null] {
  if (typeof user.username !== 'string') {
    return [false, 'username'];
  }
  if (typeof user.classe !== 'string') {
    return [false, 'classe'];
  }
  if (typeof user.password !== 'string') {
    return [false, 'password'];
  }

  return [true, null];
}

function validateLevel(level: number): string | undefined {
  if (level <= 0) {
    return ('"level" must be greater than or equal to 1');
  }

  if (typeof level !== 'number') {
    return ('"level" must be a number');
  }
}

function validationUser(req: Request, res: Response, next: NextFunction) {
  const user: User = req.body;
  let [valid, property] = validateProperties(user);
  if (!valid) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: `"${property}" is required` });
  }
  const [valide, propriedade, tamanho] = validateLength(user);
  if (!valide) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message: `"${propriedade}" length must be at least ${tamanho} characters long` });
  }
  [valid, property] = validateString(user);
  if (!valid) {
    return res.status(422).json({ message: `"${property}" must be a string` });
  }
  const result = validateLevel(user.level);
  if (result) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: `${result}` });
  next();
}

export default validationUser;