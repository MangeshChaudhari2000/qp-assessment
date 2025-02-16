import mongoose, { Document, Schema } from "mongoose";

// Define the schema
const grocerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // Optional: to add timestamps like createdAt and updatedAt automatically
);



// Create and export the model, with the interface for TypeScript typing
const Grocery = mongoose.model('Grocery', grocerySchema);

export default Grocery;
