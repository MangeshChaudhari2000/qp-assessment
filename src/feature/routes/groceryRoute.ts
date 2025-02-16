import express, { Request, Response,NextFunction } from "express";
import GroceryController from "../controller/groceryController"
import { isAdminMiddleware } from "../../middlewares/isAdmin.middleware";
export const groceryRoute = express.Router();
const groceryController = new GroceryController();

groceryRoute.post("/addGroceryItem",isAdminMiddleware, (req: Request, res: Response) => {
  groceryController.addGroceryItem(req, res);
});

groceryRoute.get("/getGroceryItem",isAdminMiddleware, (req: Request, res: Response) => {
  groceryController.getGroceryItem(req, res);
});

groceryRoute.get("/getAllGroceryItem", (req: Request, res: Response) => {
  groceryController.getAllGroceryItem(req, res);
});

groceryRoute.delete("/deleteGroceryItem",isAdminMiddleware, (req: Request, res: Response) => {
  groceryController.deleteGroceryItem(req, res);
});

groceryRoute.put("/updateGroceryItem",isAdminMiddleware, (req: Request, res: Response) => {
  groceryController.updateGroceryItem(req, res);
});

groceryRoute.put("/manageGroceryItemStock",isAdminMiddleware, (req: Request, res: Response) => {
  groceryController.manageGroceryItemStock(req, res);
});