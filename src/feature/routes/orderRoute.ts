import express, { Request, Response } from "express";
import OrderController from "../controller/orderController";


export const orderRoute = express.Router();
const orderController = new OrderController();

orderRoute.put("/orderGrocery", (req: Request, res: Response) => {
    orderController.orderGrocery(req, res);
});
