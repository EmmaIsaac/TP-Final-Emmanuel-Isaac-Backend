import { Router } from "express";
import { register, login } from "../controllers/userController.js";
import { validateUser } from "../middleware/validateUser.js";

const userRouter = Router();

userRouter.use(validateUser);

userRouter.post("/register", register);
userRouter.post("/login", login);

export { userRouter };
