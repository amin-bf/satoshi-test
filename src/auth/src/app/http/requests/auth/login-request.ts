import { BaseRequest, Password } from "@satoshi/common";
import { checkSchema } from "express-validator";

import { IUserDoc, User } from "../../../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: IUserDoc;
    }
  }
}

export class LoginRequest extends BaseRequest {
  static rules() {
    return [
      checkSchema({
        name: {
          trim: true,
          isEmpty: {
            bail: true,
            errorMessage: "Wrong credentials.",
            negated: true,
          },
          custom: {
            options: async (name: string, { req }) => {
              if (!name) return Promise.reject("Wrong credentials.");

              const user = await User.findOne({
                name,
              });
              if (!user) return Promise.reject("Wrong credentials.");

              if (!req.body.password)
                return Promise.reject("Wrong credentials.");

              const passwordMatched = await Password.compare(
                user.password,
                req.body.password
              );

              if (!passwordMatched) return Promise.reject("Wrong credentials.");

              req.user = user;
            },
            errorMessage: "Wrong credentials.",
          },
          escape: true,
        },
      }),
    ];
  }
}
