import { Router } from "express";
import { createPatient, deletePatient, getPatientById, getPatients, updatePatient } from "../controllers/patient.controller";
import { managerMiddleware } from "../middleware/manager.middleware";
const patientRouter = Router();

patientRouter.get("/", managerMiddleware, getPatients)
patientRouter.get("/:patientId", managerMiddleware, getPatientById)
patientRouter.put("/", managerMiddleware, updatePatient)
patientRouter.delete("/", managerMiddleware, deletePatient)
patientRouter.post("/", managerMiddleware, createPatient)
export default patientRouter;