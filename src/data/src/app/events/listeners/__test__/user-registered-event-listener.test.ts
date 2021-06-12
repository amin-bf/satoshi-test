import { Message } from "node-nats-streaming";
import { natsWrapper } from "../../../../nats-wrapper";
import mongoose from "mongoose";

import { IUserRegisteredEvent } from "@satoshi/common";
import { User } from "../../../models/user";
import { UserRegisteredEventListener } from "../user-registered-event-listener";

const setup = () => {
  const listener = new UserRegisteredEventListener(natsWrapper.client);

  const data: IUserRegisteredEvent["data"] = {
    name: "user",
    age: 31,
    score: 32.56,
    id: new mongoose.Types.ObjectId().toHexString(),
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it("acks the nats message", async () => {
  const { listener, data, msg } = setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toBeCalled();
});

it("saves user in database", async () => {
  const { listener, data, msg } = setup();

  await listener.onMessage(data, msg);

  expect(await User.findById(data.id)).toBeTruthy();
});
