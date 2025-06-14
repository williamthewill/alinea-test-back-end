import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const model = {
    getUsers: () => prisma.user.findMany({ include: { memberCarePlans: true, nurseCarePlans: true } }),
    getUserById: (id: string) => {
        return prisma.user.findUnique({
            where: { id },
            include: { memberCarePlans: true, nurseCarePlans: true }
        })
    },
    createUser: (args: any) => prisma.user.create({ data: args }),
    updateUser: (args: any) => {
        const { id, ...data } = args;
        return prisma.user.update({ where: { id }, data });
    }
    // Additional methods can be added here as needed
}

export default model;