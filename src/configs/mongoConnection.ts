import mongoose from "mongoose";


export const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
