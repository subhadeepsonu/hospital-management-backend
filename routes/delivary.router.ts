import { Router } from "express";
import { createDelivary, deleteDelivary, getDelivary, getDelivaryById, updateDelivary } from "../controllers/delivary.controller";
const delivaryRouter = Router();

delivaryRouter.get("/delivary/:id", getDelivaryById)
delivaryRouter.get("/delivary", getDelivary)
delivaryRouter.post("/delivary", createDelivary)
delivaryRouter.put("/delivary", updateDelivary)
delivaryRouter.delete("/delivary", deleteDelivary)

export default delivaryRouter;