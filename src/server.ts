import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import bodyParser from "body-parser";

import { mongoConnection } from "./configs/mongoConnection";
import ApplicationError, { responseMiddleware } from './middlewares/applicationError';
import { groceryRoute } from "./feature/routes/groceryRoute";
import { orderRoute } from "./feature/routes/orderRoute";
//boiler plate
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(bodyParser.json());
server.use(express.json());
server.use("/api/grocery",groceryRoute);
server.use("/api/order",orderRoute);
server.get("/", (req, res) => {
  res.send("Hello World");
});


server.use(
  (err: Error, req: Request, res: Response, next: NextFunction): void => {
    responseMiddleware(err, req, res, next);
  }
);

server.listen(process.env.PORT, () => {
  mongoConnection();
  console.log("Server is running on port", process.env.PORT);
});
