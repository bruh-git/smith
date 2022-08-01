import express, { NextFunction, Request, Response } from 'express';
import ProductRouters from './routers/products.routers';
import UserRouters from './routers/users.routers';

const app = express();

app.use(express.json());

app.use(ProductRouters);
app.use(UserRouters);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;
  console.log(`name: ${name}`);

  switch (name) {
    case 'ValidationError':
      res.status(400).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    default:
      console.error(err);
      res.sendStatus(500);
  }

  next();
});

export default app;
