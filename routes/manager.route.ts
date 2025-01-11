import { Router } from "express";
import { addstaff, deletestaff, updatestaff } from "../controllers/manager.controller";
import { managerMiddleware } from "../middleware/manager.middleware";
const managerRouter = Router();

managerRouter.post("/staff", managerMiddleware, addstaff)
managerRouter.put("/staff", managerMiddleware, updatestaff)
managerRouter.delete("/staff", managerMiddleware, deletestaff)
export default managerRouter;