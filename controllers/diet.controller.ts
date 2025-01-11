import { Response, Request } from "express";
import { prisma } from "../db";
import { createDietPlanSchema } from "../validators/diet.validator";
export async function getDietPlans(req: Request, res: Response) {
    try {
        const dietPlans = await prisma.dietChart.findMany({

        });
        res.json({
            success: true,
            data: dietPlans
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
export async function getDietPlanById(req: Request, res: Response) {
    try {
        const dietPlan = await prisma.dietChart.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
        });
        res.json({
            success: true,
            data: dietPlan
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
export async function createDietPlan(req: Request, res: Response) {
    try {
        const body = req.body;
        const check = createDietPlanSchema.safeParse(body);
        if (!check.success) {
            res.json({
                success: false,
                message: check.error.message
            })
            return
        }
        await prisma.dietChart.create({
            data: check.data
        });
        res.json({
            success: true,
            data: "Diet plan created successfully"
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

export async function updateDietPlan(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id)
        const body = req.body;
        const check = createDietPlanSchema.safeParse(body);
        if (!check.success) {
            res.json({
                success: false,
                message: check.error.message
            })
            return
        }
        if (!id) {
            res.json({
                success: false,
                message: "Id is required"
            })
            return
        }
        const dietPlan = await prisma.dietChart.update({
            where: {
                id
            },
            data: check.data
        });
        res.json({
            success: true,
            data: "Diet plan updated successfully"
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

export async function deleteDietPlan(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id)
        if (!id) {
            res.json({
                success: false,
                message: "Id is required"
            })
            return
        }
        await prisma.dietChart.delete({
            where: {
                id
            }
        });
        res.json({
            success: true,
            data: "Diet plan deleted successfully"
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
