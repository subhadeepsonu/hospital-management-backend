import { Router } from "express";
import { addManager } from "../controllers/manager.controller";
const managerRouter = Router();


managerRouter.post("/addManager", addManager)
export default managerRouter;