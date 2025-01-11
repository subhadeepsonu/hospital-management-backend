import { prisma } from "../db";
import { Request, Response } from "express";
import { patientSchema } from "../validators/patient.validator";
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
            }, include: {
                dietCharts: {
                    include: {
                        delivary: true,
                        pantry: true
                    }
                }

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
        const body = req.body
        const check = patientSchema.safeParse(body)
        if (!check.success) {
            res.json({
                success: false,
                message: check.error.message
            })
            return
        }
        await prisma.patient.create({
            data: check.data
        })
        res.json({
            success: true,
            data: "Patient created successfully"
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
export async function updatePatient(req: Request, res: Response) {
    try {
        const body = req.body
        const check = patientSchema.safeParse(body)
        const id = req.params.id
        if (!id) {
            res.json({
                success: false,
                message: "Patient id is required"
            })
            return
        }
        if (!check.success) {
            res.json({
                success: false,
                message: check.error.message
            })
            return
        }
        await prisma.patient.update({
            where: {
                id: parseInt(id)
            },
            data: check.data
        })
        res.json({
            success: true,
            data: "Patient updated successfully"
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
export async function deletePatient(req: Request, res: Response) {
    try {
        const id = req.params.id
        if (!id) {
            res.json({
                success: false,
                message: "Patient id is required"
            })
            return
        }
        await prisma.patient.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.json({
            success: true,
            data: "Patient deleted successfully"
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
