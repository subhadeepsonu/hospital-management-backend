import { Router } from "express";
import { createDietPlan, deleteDietPlan, getDietPlanById, getDietPlans, updateDietPlan } from "../controllers/diet.controller";
import { managerMiddleware } from "../middleware/manager.middleware";
import { pantryMiddleware } from "../middleware/pantry.middleware";

const dietRouter = Router();
dietRouter.get("/", (req, res) => {
    res.send("Hello World!");
}
);

dietRouter.get("/", pantryMiddleware, getDietPlans)
dietRouter.post("/", managerMiddleware, createDietPlan)
dietRouter.put("/", managerMiddleware, updateDietPlan)
dietRouter.delete("/", managerMiddleware, deleteDietPlan)
dietRouter.get("/:id", pantryMiddleware, getDietPlanById)


export default dietRouter;