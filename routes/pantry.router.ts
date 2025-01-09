import { Router } from "express";
import { createPantry, deletePantry, getPantry, getPantryById, updatePantry } from "../controllers/pantry.controller";
const pantryRouter = Router();
pantryRouter.get("/", (req, res) => {
    res.send("Hello World!");
});
pantryRouter.get("/pantry/:id", getPantryById)
pantryRouter.get("/pantry", getPantry)
pantryRouter.post("/pantry", createPantry)
pantryRouter.put("/pantry", updatePantry)
pantryRouter.delete("/pantry", deletePantry)
export default pantryRouter;