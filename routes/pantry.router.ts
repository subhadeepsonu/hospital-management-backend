import { Router } from "express";
import { getPantry, getPantryById, getTask, updateTask } from "../controllers/pantry.controller";
import { pantryMiddleware } from "../middleware/pantry.middleware";
import { managerMiddleware } from "../middleware/manager.middleware";
const pantryRouter = Router();

pantryRouter.get("/", managerMiddleware, getPantry)
pantryRouter.get("/gettask", pantryMiddleware, getTask)
pantryRouter.put("/updatetask/:id", pantryMiddleware, updateTask)
pantryRouter.get("/:id", managerMiddleware, getPantryById)
export default pantryRouter;