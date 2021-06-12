import { Router } from "express";

import { requireAuth } from "@satoshi/common";
import { user } from "../app/http/controllers/data-controller";

const router = Router();

router.get("/api/data/view", requireAuth, user);

export { router as dataRouter };
