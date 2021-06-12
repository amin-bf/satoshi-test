import { BadRequestError } from "@satoshi/common";
import { Request, Response } from "express";
import { User } from "../../models/user";

export const user = async (req: Request, res: Response) => {
  const authPayload = req.currentUser;

  if (!authPayload) throw new BadRequestError();

  const user = await User.findById(authPayload.id);

  if (!user) throw new BadRequestError();

  res.json(user);
};
