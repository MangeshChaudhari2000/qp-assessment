import { Request, Response, NextFunction } from "express";

export const isAdminMiddleware =  async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.usertype === "admin") {
    next();
  }else{
    res.status(401).json({ message: "Unauthorized! [testNote: usertype in header is not admin]" });
  }
};
