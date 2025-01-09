import { Router } from "express";
import { createDietPlan, deleteDietPlan, getDietPlanById, getDietPlans, updateDietPlan } from "../controllers/diet.controller";

const dietRouter = Router();
dietRouter.get("/", (req, res) => {
    res.send("Hello World!");
}
);
dietRouter.post("/dietplan", createDietPlan)
dietRouter.get("/dietplan/:id", getDietPlanById)
dietRouter.get("/dietplan", getDietPlans)
dietRouter.put("/dietplan", updateDietPlan)
dietRouter.delete("/dietplan", deleteDietPlan)


export default dietRouter;