
import { Router } from "express";
import { createUser } from "../controller/user/create-user.js";
import { getUser } from "../controller/user/get-user.js";

export const userRouter = Router();

userRouter.post("/signup", createUser);
userRouter.get("/:id" , getUser)