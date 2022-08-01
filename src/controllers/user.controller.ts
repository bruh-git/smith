import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user.service';

const JWT_SECRET: Secret = 'password';
const jwtConfig: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };

class UserController {
  public service: UserService;

  constructor(service: UserService = new UserService()) {
    this.service = service;
  }

  public async create(req: Request, res: Response) {
    const user = req.body;
    const createdUser = await this.service.create(user);
    const token = jwt.sign({ createdUser }, JWT_SECRET, jwtConfig); 
    res.status(StatusCodes.CREATED).json({ token });
  }
}

export default UserController;