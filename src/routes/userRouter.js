import { Router } from "express";
import { register, login } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/register", register);
userRouter.get("/login", login);

export { userRouter };
