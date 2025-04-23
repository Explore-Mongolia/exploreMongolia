
import { Router } from "express";
import { createDestination } from "../controller/destination/create-destination.js";
import { getDestination } from "../controller/destination/get-destination.js";

export const destinationRouter = Router();

destinationRouter.post("/create", createDestination);
destinationRouter.get("/get/:id", getDestination);