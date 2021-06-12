import { Request, Response, urlencoded } from "express";

import { User } from "../../models/user";

export const login = async (req: Request, res: Response) => {
  let response = null;
  try {
    const user = req.user;
    const token = user!.issueToken();

    req.session!.jwt = token;

    response = {
      user,
      token,
    };
  } catch (error) {
    throw new Error(error);
  }

  res.json(response);
};

export const register = async (req: Request, res: Response) => {
  const { password, name, age, score } = req.body;

  const user = await User.build({
    name,
    age,
    score,
    password,
  });

  await user.save();

  // The response object
  let response = null;

  try {
    const token = user.issueToken();

    req.session!.jwt = token;

    response = {
      user,
      token,
    };
  } catch (error) {
    throw new Error(error);
  }

  await user.fireRegistered();

  res.status(201).json(response);
};

export const logout = async (req: Request, res: Response) => {
  req.session = null;

  res.json({ message: "Logged out." });
};
