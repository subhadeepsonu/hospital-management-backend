import express from "express";
import delivaryRouter from "./routes/delivary.router";
import patientRouter from "./routes/patient.router";
import pantryRouter from "./routes/pantry.router";
import dietRouter from "./routes/diet.router";
import managerRouter from "./routes/manager.route";
import { loginSchema } from "./validators/manager.validator";
import { prisma } from "./db";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const app = express();
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(express.json());
app.post("/login", async (req, res) => {
    const body = req.body;
    const check = loginSchema.safeParse(body);
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
    const verify = bcrypt.compareSync(check.data.password, user.password)
    if (!verify) {
        res.json({
            success: false,
            message: "Invalid password"
        })
        return
    }
    const token = jwt.sign({ id: user.id, role: user.role }, "secret")
    res.json({
        success: true,
        message: token
    })
});
app.use("/patient", patientRouter)
app.use("/delivary", delivaryRouter)
app.use("/pantry", pantryRouter)
app.use("/diet", dietRouter)
app.use('/manager', managerRouter)
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});