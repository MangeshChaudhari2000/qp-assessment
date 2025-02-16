import express, { Request, Response } from "express";
import GroceryController from "../controller/groceryController"

export const groceryRoute = express.Router();
const groceryController = new GroceryController();

groceryRoute.post("/addGroceryItem", (req: Request, res: Response) => {
  groceryController.addGroceryItem(req, res);
});

groceryRoute.get("/getGroceryItem", (req: Request, res: Response) => {
  groceryController.getGroceryItem(req, res);
});

groceryRoute.get("/getAllGroceryItem", (req: Request, res: Response) => {
  groceryController.getAllGroceryItem(req, res);
});

groceryRoute.delete("/deleteGroceryItem", (req: Request, res: Response) => {
  groceryController.deleteGroceryItem(req, res);
});

groceryRoute.put("/updateGroceryItem", (req: Request, res: Response) => {
  groceryController.updateGroceryItem(req, res);
});

groceryRoute.put("/manageGroceryItemStock", (req: Request, res: Response) => {
  groceryController.manageGroceryItemStock(req, res);
});