import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const model = {
    getCarePlans: () => prisma.carePlan.findMany({
        include: {
            events: true,
            carePlanHistory: true,
            member: true,
            nurse: true
        }
    }),
    getCarePlanById: (id: string) => prisma.carePlan.findUnique({
        where: { id },
        include: {
            events: true,
            carePlanHistory: true,
            member: true,
            nurse: true
        }
    }),
    getCarePlanByMemberId: (memberId: string) => prisma.carePlan.findMany({
        where: { memberId },
        include: {
            events: true,
            carePlanHistory: true,
            member: true,
            nurse: true
        }
    }),
    getCarePlanByNurseId: (nurseId: string) => prisma.carePlan.findMany({
        where: { nurseId },
        include: {
            events: true,
            carePlanHistory: true,
            member: true,
            nurse: true
        }
    }),
    createCarePlan: (args: any) => prisma.carePlan.create({ data: args }),
    updateCarePlan: (args: any) => {
        const { id, ...data } = args;
        return prisma.carePlan.update({ where: { id }, data });
    }
    // Additional methods can be added here as needed

}
export default model;