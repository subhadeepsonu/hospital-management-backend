import zod from "zod";
export const patientSchema = zod.object({
    name: zod.string(),
    diseases: zod.string(),
    allergies: zod.string(),
    roomNumber: zod.number().int(),
    bedNumber: zod.number().int(),
    floorNumber: zod.number().int(),
    age: zod.number().int(),
    gender: zod.string(),
    contactInfo: zod.string(),
    emergencyContact: zod.string(),
    dietaryNotes: zod.string().optional(),
});