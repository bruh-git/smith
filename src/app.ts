import express, { NextFunction, Request, Response } from 'express';
import ProductRouters from './routers/products.routers';
import UserRouters from './routers/users.routers';
import OrderRouters from './routers/orders.routers';
import LoginRouters from './routers/login.routers';

const app = express();

app.use(express.json());

app.use(LoginRouters);
app.use(ProductRouters);
app.use(UserRouters);
app.use(OrderRouters);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;
  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'UnprocessableEntityError':
      res.status(422).json({ message });
      break;
    case 'UnauthorizedError':
      res.status(401).json({ message });
      break;
    default:
      res.sendStatus(500).json({ message });
  }

  next();
});

export default app;
