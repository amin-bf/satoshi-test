import mongoose from "mongoose";

// Attributes used for user creation
export interface IUserAttrs {
  name: string;
  age: number;
  score: number;
  _id: string;
}

// Version is not included for simplicity. It is required for OCC (Optimistic Concurrency Control)
export interface IUserDoc extends mongoose.Document {
  name: string;
  age: number;
  score: number;
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
  },
  {
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// To have the advantage of typescript. This will be used to create new users
userSchema.statics.build = (userAttrs: IUserAttrs): IUserDoc => {
  const user = new User(userAttrs);

  return user;
};

export const User = mongoose.model<IUserDoc, IUserModel>("User", userSchema);
