import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import { globalRoutes } from './routes';
import globalErrorHandler from './app/middleware/globalErrorHandler';

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', (req, res) => {
  res.json({
    status: 200,
    message: "E-commerce",
    author: "sazzad-karim",
    version: "1.0.0",
    date: 10/29/2023,
    greetings: "Welcome to the E-commerce project"
  });
});

app.use("/api/v1", globalRoutes);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});



export default app;