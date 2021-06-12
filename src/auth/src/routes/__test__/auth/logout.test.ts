import { Subjects } from "@satoshi/common";
import request from "supertest";

import { app } from "../../../app";
import { natsWrapper } from "../../../nats-wrapper";

it("has a handler listening on /api/auth/logout for post requests", async () => {
  const response = await request(app).post("/api/auth/logout").send();

  expect(response.status).not.toEqual(404);
});

it("responds with 401 if not authenticated", async () => {
  await request(app).post(`/api/auth/logout`).send().expect(401);
});

it("responds with 200 status", async () => {
  const cookie = global.login();

  const response = await request(app)
    .post("/api/auth/logout")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.message).toEqual("Logged out.");
});
