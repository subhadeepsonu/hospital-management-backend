import zod from "zod"
export const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
})
export const registerSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
    name: zod.string(),
    role: zod.enum(["admin", "pantry", "delivery"]),
    contactInfo: zod.string().min(10).max(10)
})
