import { Response, Request } from "express";
import { prisma } from "../db";
export async function getPantry(req: Request, res: Response) {
    try {
        const response = await prisma.staff.findMany({
            where: {
                role: "pantry"
            }

        })
        res.json({
            success: true,
            message: response

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
export async function getPantryById(req: Request, res: Response) {
    try {
        const id = req.params.id
        if (id == null) {
            res.json({
                success: false,
                message: "Id is required"
            })
            return
        }
        const response = await prisma.staff.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                pantryTasks: true
            }
        })
        res.json({
            success: true,
            message: response
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
export async function getTask(req: Request, res: Response) {
    try {
        const id = req.body.userid
        const response = await prisma.dietChart.findMany({
            where: {
                pantryId: parseInt(id)
            }, include: {
                pantry: true,
                delivary: true
            }
        })
        res.json({
            success: true,
            data: response
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
export async function updateTask(req: Request, res: Response) {
    try {
        const id = req.params.id
        const userid = req.body.userid
        const response = await prisma.dietChart.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if (response == null) {
            res.json({
                success: false,
                message: "Task not found"
            })
            return
        }
        if (response.pantryId != parseInt(userid)) {
            res.json({
                success: false,
                message: "You are not authorized to update this task"
            })
            return
        }
        await prisma.dietChart.update({
            where: {
                id: parseInt(id)
            },
            data: {
                status: "COMPLETED"
            }
        })
        res.json({
            success: true,
            message: "Task updated successfully"
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

