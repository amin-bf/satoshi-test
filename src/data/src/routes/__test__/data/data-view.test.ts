import request from "supertest";
import { app } from "../../../app";

it("has a route handler listening on /api/data/view for get requests", async () => {
  const response = await request(app).get("/api/data/view").send();

  expect(response.status).not.toEqual(404);
});

it("responds with 401 if not authenticated", async () => {
  await request(app).get("/api/data/view").send().expect(401);
});

it("responds with 200 if authenticated", async () => {
  const user = await global.createUser("user");
  const cookie = global.login(user.id);

  await request(app)
    .get("/api/data/view")
    .set("Cookie", cookie)
    .send()
    .expect(200);
});

it("responds with 200 and current user data if authenticated", async () => {
  const user = await global.createUser("user");
  const cookie = global.login(user.id);

  const response = await request(app)
    .get("/api/data/view")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.id).toEqual(user.id);
  expect(response.body.name).toEqual(user.name);
  expect(response.body.score).toEqual(user.score);
  expect(response.body.age).toEqual(user.age);
});
