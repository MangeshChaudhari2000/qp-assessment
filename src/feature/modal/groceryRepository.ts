import mongoose, { Document, Model, Schema } from "mongoose";
import ApplicationError from "../../middlewares/applicationError";
import Grocery from "../schema/grocery.Schema";

export default class GroceryRepository {
  async addGroceryItemRepo(
    name: string,
    description: string,
    price: number,
    stock: number
  ) {
    try {
      const data = new Grocery({ name, description, price, stock });
      const isSaved = await data.save();
      if (isSaved) {
        return isSaved;
      }
    } catch (error: Error | any) {
      throw new ApplicationError(error.message, 500);
    }
  }

  async getGroceryItemRepo(groceryItemId: string) {
    try {
      const data = await Grocery.findById(groceryItemId);
      if (data) {
        return data;
      }
    } catch (error: Error | any) {
      throw new ApplicationError(error.message, 500);
    }
  }

  async deleteGroceryItemRepo(groceryItemId: string) {
    try {
      const data = await Grocery.findByIdAndDelete(groceryItemId);
      if (data) {
        return data;
      }
    } catch (error: Error | any) {
      throw new ApplicationError(error.message, 500);
    }
  }

  async updateGroceryItemRepo(groceryItemId: string, restBody: Object) {
    try {
      const data = await Grocery.findByIdAndUpdate(groceryItemId, restBody, {
        new: true,
      });
      if (data) {
        return data;
      }
      throw new ApplicationError("Grocery item not found", 404);
    } catch (error: Error | any) {
      throw new ApplicationError(error.message, 500);
    }
  }

  async getAllGroceryItemRepo(){
    try {
        const data=await Grocery.find({});
        if(data){
            return data;
        }else{
            throw new ApplicationError("Grocery item not found",404);
        }
    } catch (error:Error|any) {
        throw new ApplicationError(error.message,500);
    }
}
}
