import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const model = {
    CarePlanHistories: () => prisma.carePlanHistory.findMany({
        include: {
            carePlan: true,
        }
    }),
    getCarePlanHistoryById: (id: string) => prisma.carePlanHistory.findUnique({
        where: { id },
        include: {
            carePlan: true,
        }
    }),
    getCarePlanHistoryByCarePlanId: (carePlanId: string) => prisma.carePlanHistory.findMany({
        where: { carePlanId },
        include: {
            carePlan: true,
        }
    }),
    createCarePlanHistory: (args: any) => prisma.carePlanHistory.create({ data: args }),
};

export default model;