import { Subjects } from "@satoshi/common";
import request from "supertest";

import { app } from "../../../app";
import { natsWrapper } from "../../../nats-wrapper";

it("has a handler listening on /api/auth/login for post requests", async () => {
  const response = await request(app).post("/api/auth/login").send();

  expect(response.status).not.toEqual(404);
});

it("responds with 403 if authenticated", async () => {
  const cookie = await global.login();

  await request(app)
    .post(`/api/auth/login`)
    .set("Cookie", cookie)
    .send()
    .expect(403);
});

it("responds with 422 status if no 'name' is provided", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({})
    .expect(422);

  expect(response.body.errors).toBeDefined();

  const hasUsernameError = response.body.errors.some(
    (error: any) => error.field === "name"
  );
  expect(hasUsernameError).toBeTruthy();
});

it("responds with 422 status if non-existing 'name' is provided", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      name: "test",
    })
    .expect(422);

  expect(response.body.errors).toBeDefined();

  const hasUsernameError = response.body.errors.some(
    (error: any) => error.field === "name"
  );
  expect(hasUsernameError).toBeTruthy();
});

it("responds with 422 status if no 'password' is provided", async () => {
  const user = await global.createUser("user");

  const response = await request(app)
    .post("/api/auth/login")
    .send({
      name: user.name,
    })
    .expect(422);

  expect(response.body.errors).toBeDefined();

  const hasPasswordError = response.body.errors.some(
    (error: any) => error.field === "name"
  );
  expect(hasPasswordError).toBeTruthy();
});

it("responds with 422 status 'password' does not match", async () => {
  const user = await global.createUser("user");

  const response = await request(app)
    .post("/api/auth/login")
    .send({
      name: user.name,
      password: "wrong password",
    })
    .expect(422);

  expect(response.body.errors).toBeDefined();

  const hasPasswordError = response.body.errors.some(
    (error: any) => error.field === "name"
  );
  expect(hasPasswordError).toBeTruthy();
});

it("responds with 200 status provided correct data", async () => {
  const user = await global.createUser("user");

  await request(app)
    .post("/api/auth/login")
    .send({
      name: user.name,
      password: "123456789",
    })
    .expect(200);
});

it("provides token provided correct credentials", async () => {
  const user = await global.createUser("user");

  const response = await request(app)
    .post("/api/auth/login")
    .send({
      name: user.name,
      password: "123456789",
    })
    .expect(200);

  expect(response.body.token).toBeDefined();
});

it("provides user details provided correct credentials", async () => {
  const user = await global.createUser("user");

  const response = await request(app)
    .post("/api/auth/login")
    .send({
      name: user.name,
      password: "123456789",
    })
    .expect(200);

  expect(response.body.user).toBeDefined();
  expect(response.body.user.name).toEqual("user");
  expect(response.body.user.age).toEqual(15);
  expect(response.body.user.score).toEqual(25);
});
