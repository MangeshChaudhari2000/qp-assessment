import { Request, Response } from "express";
import GroceryRepository from "../modal/groceryRepository";
import ApplicationError from "../../middlewares/applicationError";

export default class GroceryController {
  private groceryRepository: GroceryRepository;
  constructor() {
    this.groceryRepository = new GroceryRepository();
  }

  async addGroceryItem(req: Request, res: Response) {
    try {
      const { name, description, price, stock } = req.body;
      const addGroceryResponse =
        await this.groceryRepository.addGroceryItemRepo(
          name,
          description,
          price,
          stock
        );
      if (addGroceryResponse) {
        res
          .status(200)
          .json({ "Grocery Added Successfully": addGroceryResponse });
      }
    } catch (error: Error | any) {
      res.status(500).json(error.message);
    }
  }

  async getGroceryItem(req: Request, res: Response) {
    try {
      const getGroceryResponse =
        await this.groceryRepository.getGroceryItemRepo(req.body.groceryItemId);
      if (getGroceryResponse) {
        res
          .status(200)
          .json({ "Grocery item fetched successfully": getGroceryResponse });
      }
    } catch (error: Error | any) {
      throw new ApplicationError(error.message, 500);
    }
  }

  async deleteGroceryItem(req: Request, res: Response) {
    try {
      const deleteGroceryResponse =
        await this.groceryRepository.deleteGroceryItemRepo(
          req.body.groceryItemId
        );
      if (deleteGroceryResponse) {
        res
          .status(200)
          .json({ "Grocery item deleted successfully": deleteGroceryResponse });
      }
    } catch (error: Error | any) {
      throw new ApplicationError(error.message, 500);
    }
  }

  async updateGroceryItem(req: Request, res: Response) {
    try {
      const { groceryItemId, ...restBody } = req.body;
      if (!groceryItemId) {
        throw new ApplicationError("Grocery item id is required", 400);
      }
      const updateGroceryResponse =
        await this.groceryRepository.updateGroceryItemRepo(groceryItemId, restBody);
      if (updateGroceryResponse) {
        res
          .status(200)
          .json({ "Grocery item updated successfully": updateGroceryResponse });
      }
    } catch (error: Error | any) {
      throw new ApplicationError(error.message, 500);
    }
  }

  async manageGroceryItemStock(req: Request, res: Response) {
    try {
      const { groceryItemId, newStock } = req.body;
      if (!groceryItemId) {
        throw new ApplicationError("Grocery item id is required", 400);
      }
      const updateGroceryResponse =
        await this.groceryRepository.updateGroceryItemRepo(groceryItemId, {stock:newStock});
      if (updateGroceryResponse) {
        res
          .status(200)
          .json({ "Grocery item updated successfully": updateGroceryResponse });
      }
    } catch (error: Error | any) {
      throw new ApplicationError(error.message, 500);
    }
  }

   async getAllGroceryItem(req: Request, res: Response) {
      try {
        const data = await this.groceryRepository.getAllGroceryItemRepo();
        if (data) {
          return res
            .status(200)
            .json({ "Grocery item fetched successfully": data });
        }
      } catch (error: Error | any) {
        throw new ApplicationError(error.message, 500);
      }
    }
}
