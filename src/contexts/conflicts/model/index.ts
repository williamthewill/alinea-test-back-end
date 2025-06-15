import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const model = {
    getConflicts: () => prisma.hasConflicts.findMany({
        include: {
            firstEvent: true,
            secondEvent: true,
        }
    }),
    getConflictsByEventId: (eventId: string) => prisma.hasConflicts.findMany({
        where: { OR: [{ firstEventId: eventId }, { secondEventId: eventId }] },
        include: {
            firstEvent: true,
            secondEvent: true
        }
    }),
    createConflict: (args: any) => prisma.hasConflicts.create({ data: args }),
    updateConflict: (args: any) => {
        const { firstEventId, secondEventId, ...data } = args;
        return prisma.hasConflicts.update({ where: { firstEventId_secondEventId: { firstEventId, secondEventId } }, data });
    }
}

export default model;
