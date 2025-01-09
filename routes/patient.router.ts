import { Router } from "express";
import { createPatient, deletePatient, getPatientById, getPatients, updatePatient } from "../controllers/patient.controller";
const patientRouter = Router();

patientRouter.get("/patient", getPatients)
patientRouter.get("/patient/:patientId", getPatientById)
patientRouter.put("/patient", updatePatient)
patientRouter.delete("/patient", deletePatient)
patientRouter.post("/patient", createPatient)
export default patientRouter;