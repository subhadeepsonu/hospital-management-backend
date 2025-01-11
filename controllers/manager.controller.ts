import { Response, Request } from "express";
import { registerSchema } from "../validators/manager.validator";
import { prisma } from "../db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function addstaff(req: Request, res: Response) {
    try {
        const body = req.body
        const check = registerSchema.safeParse(body)
        if (!check.success) {
            res.json({
                success: false,
                message: check.error.message
            })
            return
        }
        const user = await prisma.staff.findUnique({
            where: {
                email: body.email
            }
        })
        if (user) {
            res.json({
                success: false,
                message: "User already exists"
            })
            return
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(body.password, salt)
        const newUser = await prisma.staff.create({
            data: {
                email: check.data.email,
                password: hashedPassword,
                name: check.data.name,
                role: check.data.role,
                contactInfo: check.data.contactInfo
            }
        })
        const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET!)
        res.json({
            success: true,
            token: token
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
export async function updatestaff(req: Request, res: Response) {
    try {
        const body = req.body
        const check = registerSchema.safeParse(body)
        if (!check.success) {
            res.json({
                success: false,
                message: check.error.message
            })
            return
        }
        const user = await prisma.staff.findUnique({
            where: {
                email: check.data.email
            }
        })
        if (!user) {
            res.json({
                success: false,
                message: "User not found"
            })
            return
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(check.data.password, salt)
        await prisma.staff.update({
            where: {
                email: body.email
            },
            data: {
                email: check.data.email,
                password: hashedPassword,
                name: check.data.name,
                role: check.data.role,
                contactInfo: check.data.contactInfo
            }
        })

        res.json({
            success: true,
            token: "User updated"
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
export async function deletestaff(req: Request, res: Response) {
    try {
        const id = req.params.id
        if (!id) {
            res.json({
                success: false,
                message: "Id is required"
            })
            return
        }
        await prisma.staff.delete({
            where: {
                id: parseInt(id)
            }
        })
        res.json({
            success: true,
            message: "User deleted"
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