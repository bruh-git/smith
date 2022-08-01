import { Router } from 'express';

import UserController from '../controllers/user.controller';

const userRouter = Router();

const userController = new UserController();

userRouter.post(
  '/users',
  (req, res) => userController.create(req, res),
);

export default userRouter;