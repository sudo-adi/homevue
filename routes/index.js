import userRouter from "./user.js";
import decorRouter from "./decor.js";
import authRouter from "./auth.js";

import { Router } from "express";

const router = Router();

router.use("/users", userRouter);  
router.use("/decors", decorRouter);
router.use("/auth", authRouter);

export default router;
