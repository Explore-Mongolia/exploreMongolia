
import { Router } from "express";
import { createUser } from "../controller/user/create-user.js";

export const userRouter = Router();

userRouter.post("/signup", createUser);