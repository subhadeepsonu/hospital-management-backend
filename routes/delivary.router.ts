import { Router } from "express";
import { getDelivary, getDelivaryById, getTask, updateTask } from "../controllers/delivary.controller";
import { delivaryMiddleware } from "../middleware/delivary.middleware";
import { managerMiddleware } from "../middleware/manager.middleware";

const delivaryRouter = Router();


delivaryRouter.get("/", managerMiddleware, getDelivary)
delivaryRouter.get("/gettask", delivaryMiddleware, getTask)
delivaryRouter.put("/updatetask/:id", delivaryMiddleware, updateTask)
delivaryRouter.get("/:id", managerMiddleware, getDelivaryById)

export default delivaryRouter;