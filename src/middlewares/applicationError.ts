import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

export default class ApplicationError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}

export const responseMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.message);
  } else if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message); // Handle custom ApplicationError
  } else {
    console.error(err); // Log the error
    return res.status(500).send("Something went wrong: " + err.message); // Internal server error
  }
};
