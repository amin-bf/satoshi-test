import express from "express";
import cookieSession from "cookie-session";
import "express-async-errors";

import * as router from "./routes";
import { currentUser, errorHandler, NotFoundError } from "@satoshi/common";

const app = express();

app.use(express.json());

// Config cookie
app.set("trust proxy", true);
app.use(
  cookieSession({
    secure: process.env.NODE_ENV !== "test",
    name: "satoshi_sec",
    signed: false,
  })
);

// Set req.currentUser if auth cookie present and valid
app.use(currentUser);

// Set application routes
Object.values(router).forEach((routerItem) => {
  app.use(routerItem);
});

// Catch all other routes
app.all("*", async (req, res, next) => {
  throw new NotFoundError();
});

// Unified error response
app.use(errorHandler);

export { app };
