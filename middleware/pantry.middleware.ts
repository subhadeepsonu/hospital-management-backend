import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export async function pantryMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.json({
                success: false,
                message: 'Token is required'
            })
            return
        }
        const verify: any = jwt.verify(token, process.env.JWT_SECRET!);
        if (!verify) {
            res.json({
                success: false,
                message: 'Invalid token'
            })
            return
        }
        if (verify.role == 'pantry' || verify.role == 'admin') {
            req.body.userid = verify.id
            next()
        }
        else {
            res.json({
                success: false,
                message: 'Unauthorized'
            })
            return
        }

    } catch (error: any) {
        res.json({
            success: false,
            message: error.message
        })
        return
    }
}