import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const model = {
    getEvents: () => prisma.event.findMany({
        include: {
            carePlan: true,
        }
    }),
    getEventById: (id: string) => prisma.event.findUnique({
        where: { id },
        include: {
            carePlan: true,
            typeEvent: true,
        }
    }),
    getEventsByCarePlanId: (carePlanId: string) => prisma.event.findMany({
        where: { carePlanId },
        include: {
            carePlan: true,
        }
    }),
    createEvent: (args: any) => prisma.event.create({ data: args }),
    updateEvent: (args: any) => {
        const { id, ...data } = args;
        return prisma.event.update({ where: { id }, data });
    }
};

export default model;