import {Request, Response, NextFunction } from "express"
import { User } from "../models/User";

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.userId) {
    throw new Error("unauthorized");
  }

  const user = await User.findOne({ id: req.session.userId });

  if (!user) {
    throw new Error("unauthorized 2");
  }

  res.locals.user = user;
  console.log(res.locals.user);

  next();
};