import { Router } from 'express';

import UserController from '../controllers/user.controller';
import validationUser from '../middlewares/users.middleware';

const userRouter = Router();

const userController = new UserController();

userRouter.post(
  '/users',
  validationUser,
  (req, res) => userController.create(req, res),
);

export default userRouter;