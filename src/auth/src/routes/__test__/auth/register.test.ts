import { Subjects } from "@satoshi/common";
import request from "supertest";

import { app } from "../../../app";
import { natsWrapper } from "../../../nats-wrapper";

it("has a handler listening on /api/auth/register for post requests", async () => {
  const response = await request(app).post("/api/auth/register").send();

  expect(response.status).not.toEqual(404);
});

it("responds with 403 if authenticated", async () => {
  const cookie = await global.login();

  await request(app)
    .post(`/api/auth/register`)
    .set("Cookie", cookie)
    .send()
    .expect(403);
});

it("responds with 422 status if no 'name' is provided", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({})
    .expect(422);

  expect(response.body.errors).toBeDefined();

  const hasUsernameError = response.body.errors.some(
    (error: any) => error.field === "name"
  );
  expect(hasUsernameError).toBeTruthy();
});

it("responds with 422 status if existing 'name' is provided", async () => {
  const user = await global.createUser("user");

  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name: user.name,
    })
    .expect(422);

  expect(response.body.errors).toBeDefined();

  const hasUsernameError = response.body.errors.some(
    (error: any) => error.field === "name"
  );
  expect(hasUsernameError).toBeTruthy();
});

it("responds with 422 status if existing 'name' is provided", async () => {
  const user = await global.createUser("user");

  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name: user.name,
    })
    .expect(422);

  expect(response.body.errors).toBeDefined();

  const hasUsernameError = response.body.errors.some(
    (error: any) => error.field === "name"
  );
  expect(hasUsernameError).toBeTruthy();
});

it("responds with 422 status if no 'password' is provided", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send()
    .expect(422);

  expect(response.body.errors).toBeDefined();

  const hasPasswordError = response.body.errors.some(
    (error: any) => error.field === "password"
  );
  expect(hasPasswordError).toBeTruthy();
});

it("responds with 422 status if 'password_confirmation' does not match", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({
      password: "password",
      password_confirmation: "another password",
    })
    .expect(422);

  expect(response.body.errors).toBeDefined();

  const hasPasswordError = response.body.errors.some(
    (error: any) => error.field === "password"
  );
  expect(hasPasswordError).toBeTruthy();
});

it("responds with 422 status if no 'age' is provided", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({})
    .expect(422);

  expect(response.body.errors).toBeDefined();

  const hasError = response.body.errors.some(
    (error: any) => error.field === "age"
  );
  expect(hasError).toBeTruthy();
});

it("responds with 422 status if 'age' provided is not numeric", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({
      age: "test",
    })
    .expect(422);

  expect(response.body.errors).toBeDefined();

  const hasError = response.body.errors.some(
    (error: any) => error.field === "age"
  );
  expect(hasError).toBeTruthy();
});

it("responds with 422 status if no 'score' is provided", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({})
    .expect(422);

  expect(response.body.errors).toBeDefined();

  const hasError = response.body.errors.some(
    (error: any) => error.field === "score"
  );
  expect(hasError).toBeTruthy();
});

it("responds with 422 status if 'score' provided is not numeric", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({
      score: "test",
    })
    .expect(422);

  expect(response.body.errors).toBeDefined();

  const hasError = response.body.errors.some(
    (error: any) => error.field === "score"
  );
  expect(hasError).toBeTruthy();
});

it("responds with 201 status provided correct data", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "user",
      age: 15,
      score: 15,
      password: "123456789",
      password_confirmation: "123456789",
    })
    .expect(201);
});

it("provides token provided correct credentials", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name: "user",
      age: 15,
      score: 15,
      password: "123456789",
      password_confirmation: "123456789",
    })
    .expect(201);

  expect(response.body.token).toBeDefined();
});

it("provides user details provided correct credentials", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name: "user",
      age: 15,
      score: 15,
      password: "123456789",
      password_confirmation: "123456789",
    })
    .expect(201);

  expect(response.body.user).toBeDefined();
  expect(response.body.user.name).toEqual("user");
  expect(response.body.user.age).toEqual(15);
  expect(response.body.user.score).toEqual(15);
});

it(`publishes a ${Subjects.UserRegistered} event`, async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      name: "user",
      age: 15,
      score: 15,
      password: "123456789",
      password_confirmation: "123456789",
    })
    .expect(201);

  expect(natsWrapper.client.publish).toBeCalledTimes(1);
  expect((natsWrapper.client.publish as jest.Mock).mock.calls[0][0]).toEqual(
    Subjects.UserRegistered
  );
});
