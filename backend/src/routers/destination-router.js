
import { Router } from "express";
import { createDestination } from "../controller/destination/create-destination.js";
import { getDestination } from "../controller/destination/get-destination.js";
import { updateDestination } from "../controller/destination/update-destination.js";

export const destinationRouter = Router();

destinationRouter.post("/create", createDestination);
destinationRouter.get("/get/:id", getDestination);
destinationRouter.put("/:id", updateDestination);
