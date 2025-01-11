import { Response, Request } from "express";
import { prisma } from "../db";
export async function getDelivary(req: Request, res: Response) {
    try {
        const delivary = await prisma.staff.findMany({
            where: {
                role: "delivery"
            }
        })
        res.json({
            success: true,
            data: delivary
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
export async function getDelivaryById(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id)
        const delivary = await prisma.staff.findUnique({
            where: {
                id: id
            }, include: {
                deliveryTasks: true
            }
        })
        res.json({
            success: true,
            data: delivary
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
        const userid = req.body.userid
        const id = req.params.id
        const response = await prisma.dietChart.findUnique({
            where: {
                id: parseInt(id)
            }
        })
        if (!response) {
            res.json({
                success: false,
                message: "Task not found"
            })
            return
        }
        if (response.delivaryId != parseInt(userid)) {
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
                status: "DELIVERED"
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
export async function getTask(req: Request, res: Response) {
    try {
        const id = req.body.userid
        const response = await prisma.dietChart.findMany({
            where: {
                delivaryId: parseInt(id)
            },
            include: {
                delivary: true,
                pantry: true

            }
        })
        res.json({
            success: true,
            data: response
        })
        return

    } catch (error: any) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
        return
    }
}