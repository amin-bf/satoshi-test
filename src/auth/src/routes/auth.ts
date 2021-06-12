import { requireAuth, requireGuest } from "@satoshi/common";
import { Router } from "express";

import {
  login,
  logout,
  register,
} from "../app/http/controllers/auth-controller";
import { LoginRequest } from "../app/http/requests/auth/login-request";
import { RegisterRequest } from "../app/http/requests/auth/register-request";

const router = Router();

router.post(
  "/api/auth/register",
  requireGuest,
  RegisterRequest.getChain(),
  register
);

router.post("/api/auth/login", requireGuest, LoginRequest.getChain(), login);

router.post("/api/auth/logout", requireAuth, logout);

export { router as authRouter };
