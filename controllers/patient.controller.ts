import { prisma } from "../db";
import { Request, Response } from "express";
export async function getPatients(req: Request, res: Response) {
    try {
        const patients = await prisma.patient.findMany();
        res.json({
            success: true,
            data: patients
        })
        return
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
        return
    }
}
export async function getPatientById(req: Request, res: Response) {
    try {
        const patientId = req.params.patientId;
        const patient = await prisma.patient.findUnique({
            where: {
                id: parseInt(patientId)
            }
        });
        res.json({
            success: true,
            data: patient
        })
        return
    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
        return
    }
}
export async function createPatient(req: Request, res: Response) {
    try {

    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
        return

    }
}
export async function updatePatient(req: Request, res: Response) {
    try {

    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
        return
    }
}
export async function deletePatient(req: Request, res: Response) {
    try {

    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
        return
    }
}
