import mongoose, { Document, Model, Schema } from "mongoose";
import ApplicationError from "../../middlewares/applicationError";
import Order from "../schema/order.Schema";
import Grocery from "../schema/grocery.Schema";
export default class OrderRepository {
    async orderGroceryRepo(
        groceryItems: Array<{ groceryItemId: string; quantity: number }>
      ) {
        try {
          let totalAmount = 0;
          const orderedItems = [];
      
          // Loop through each grocery item in the order to check availability, and update inventory
          for (const grocery of groceryItems) {
            const item = await Grocery.findById(grocery.groceryItemId);
      
            if (!item) {
              throw new ApplicationError(
                `Grocery item with ID ${grocery.groceryItemId} not found`,
                404
              );
            }
      
            if (item.stock < grocery.quantity) {
              throw new ApplicationError(`Not enough stock for ${item.name}`, 400);
            }
      
            // Calculate total for this item (price * quantity)
            const itemTotal = item.price * grocery.quantity;
            totalAmount += itemTotal;
      
            // Reduce stock level in the database
            item.stock -= grocery.quantity;
            await item.save();
      
            // Store the item details to be included in the order
            orderedItems.push({
              itemId: item._id,
              quantity: grocery.quantity,
              total: itemTotal,
            });
          }
      
          // Create a new order document
          const order = new Order({
            items: orderedItems,
            totalAmount, // Total cost of the order
            createdAt: new Date(),
          });
      
          // Save the order
          const savedOrder = await order.save();
      
          return savedOrder;
        } catch (error: Error | any) {
          throw new ApplicationError(error.message || "Order creation failed", 500);
        }
      }
      
}
