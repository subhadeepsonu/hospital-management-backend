import zod from 'zod';
export const addtaskvalidate = zod.object({
    pantryId: zod.number(),
    dietChartId: zod.number(),
    delivaryId: zod.number(),
});
export const updatetaskvalidate = zod.object({

    status: zod.enum(['PENDING', 'COMPLETED']),
});