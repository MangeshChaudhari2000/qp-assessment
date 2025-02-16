import { Request, Response } from "express";
import ApplicationError from "../../middlewares/applicationError";
import OrderRepository from "../modal/orderRepository";

export default class OrderController {
  private orderRepository: OrderRepository;
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async orderGrocery(req: Request, res: Response) {
    try {
      const isOrderd = await this.orderRepository.orderGroceryRepo(req.body);
      if(isOrderd){
          return res.status(200).json({ "Grocery Ordered Successfully": isOrderd });
      }
    } catch (error: Error | any) {
      throw new ApplicationError(error.message, 500);
    }
  }
}
