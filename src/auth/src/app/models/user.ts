import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import { natsWrapper } from "../../nats-wrapper";
import { UserRegisteredEventPublisher } from "../events/publishers/user-registered-event-publisher";
import { Password } from "@satoshi/common";

// Attributes used for user creation
export interface IUserAttrs {
  name: string;
  age: number;
  score: number;
  password: string;
}

// Version is not included for simplicity. It is required for OCC (Optimistic Concurrency Control)
export interface IUserDoc extends mongoose.Document {
  name: string;
  age: number;
  score: number;
  password: string;
  issueToken(): string;
  fireRegistered(): Promise<void>;
}

interface IUserModel extends mongoose.Model<IUserDoc> {
  build(userAttrs: IUserAttrs): IUserDoc;
}

// Version is not included for simplicity. It is required for OCC (Optimistic Concurrency Control)
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc: any, ret: any) {
        delete ret.password;
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  // Hash password whenever needed (on create or change)
  if (this.isModified("password")) {
    const hashedPassword = await Password.toHash(this.get("password"));
    this.set("password", hashedPassword);
  }
  done();
});

// To have the advantage of typescript. This will be used to create new users
userSchema.statics.build = (userAttrs: IUserAttrs): IUserDoc => {
  const user = new User(userAttrs);

  return user;
};

// Create and return authentication tokens
userSchema.methods.issueToken = function (): string {
  const token = jwt.sign(this.toJSON(), process.env.JWT_SECRET!, {
    expiresIn: "1y",
  });
  return token;
};

// Fire user:registered event to nats-streaming-server
userSchema.methods.fireRegistered = async function (): Promise<void> {
  const user = this as IUserDoc;

  await new UserRegisteredEventPublisher(natsWrapper.client).publish({
    id: user.id,
    name: user.name,
    age: user.age,
    score: user.score,
  });
};

export const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);
