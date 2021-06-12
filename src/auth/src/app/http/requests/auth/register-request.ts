import { BaseRequest } from "@satoshi/common";
import { checkSchema } from "express-validator";

import { IUserDoc, User } from "../../../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: IUserDoc;
    }
  }
}

export class RegisterRequest extends BaseRequest {
  static rules() {
    return [
      checkSchema({
        name: {
          trim: true,
          isEmpty: {
            bail: true,
            errorMessage: "Name must be provided.",
            negated: true,
          },
          custom: {
            options: async (name: string, { req }) => {
              if (!name) return Promise.reject("Name must be provided.");

              const user = await User.findOne({
                name,
              });
              if (user) return Promise.reject("Name already taken.");
            },
            errorMessage: "Name already taken.",
          },
          escape: true,
        },
        age: {
          trim: true,
          isNumeric: true,
          escape: true,
          errorMessage: "Age should be numeric.",
        },
        score: {
          trim: true,
          isNumeric: true,
          escape: true,
          errorMessage: "Score should be numeric.",
        },
        password: {
          notEmpty: {
            errorMessage: "Password must be provided.",
            options: {
              ignore_whitespace: true,
            },
            bail: true,
          },
          custom: {
            options: async (value: string, { req }) => {
              if (!value) return Promise.reject("Password must be provided.");
              if (value !== req.body.password_confirmation)
                return Promise.reject("Password Confirmation mismatch.");
              return Promise.resolve();
            },
            errorMessage: "Password Confirmation mismatch.",
          },
          escape: true,
        },
      }),
    ];
  }
}
