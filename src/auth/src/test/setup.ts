import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import jwt from "jsonwebtoken";

import { app } from "../app";
import { IUserAttrs, IUserDoc, User } from "../app/models/user";

declare global {
  namespace NodeJS {
    interface Global {
      login(): string[];
      createUser(name: string): Promise<IUserDoc>;
    }
  }
}

let mongo: MongoMemoryServer;

jest.mock("../nats-wrapper.ts");

beforeAll(async () => {
  process.env.JWT_SECRET = "dsfdgdfshgfhfadg";
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    if (collection.collectionName !== "permissions")
      await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

global.login = () => {
  const payload = {
    id: "fake_id",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`satoshi_sec=${base64}`];
};

global.createUser = async (name: string): Promise<IUserDoc> => {
  const user = User.build({
    name,
    age: 15,
    score: 25,
    password: "123456789",
  });

  await user.save();

  return user;
};
