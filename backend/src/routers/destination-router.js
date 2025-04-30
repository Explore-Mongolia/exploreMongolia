
import { Router } from "express";

import { createDestination } from "../controller/destination/create-destination.js";
import { getDestination } from "../controller/destination/get-destination.js";
import { updateDestination } from "../controller/destination/update-destination.js";
import { getAllDestinations } from "../controller/destination/getAll-destination.js";
import { deleteDestination } from "../controller/destination/delete-destination.js";

export const destinationRouter = Router(); 

destinationRouter.post("/create", createDestination);
destinationRouter.get("/get/:id", getDestination);
destinationRouter.put("/:id", updateDestination);
destinationRouter.get("/" , getAllDestinations)
destinationRouter.delete("/:id", deleteDestination)