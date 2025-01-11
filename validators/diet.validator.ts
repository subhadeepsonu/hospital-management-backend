import zod from 'zod';
export const createDietPlanSchema = zod.object({
    patientId: zod.number(),
    mealType: zod.enum(["BREAKFAST", "LUNCH", "DINNER"]),
    ingredients: zod.string(),
    instructions: zod.string().optional(),
    delivaryId: zod.number(),
    pantryId: zod.number(),
})
