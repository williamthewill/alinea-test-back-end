import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const member = await prisma.user.create({
        data: {
            name: 'João Gomes',
            phone: '1234567890',
            email: 'joaogomes@email.com',
            role: "Member",
            password: 'password123',
        },
    });

    const nurse = await prisma.user.create({
        data: {
            name: 'Jane Smith',
            phone: '0987654321',
            email: 'janesmith@email.com',
            role: "Nurse",
            password: 'password123',
        },
    });

    const admin = await prisma.user.create({
        data: {
            name: 'Admin User',
            phone: '1122334455',
            email: 'adminuser@email.com',
            role: "Admin",
            password: 'adminpassword',
        },
    });

    const trail = await prisma.trail.create({
        data: {
            name: "Preventivo",
            description: 'This is the initial trail for the member.',
            screenName: 'Preventiva',
        },
    });

    const nurseId = nurse.id.toString();
    const memberId = member.id.toString();
    const adminId = admin.id.toString();
    const trailId = trail.id.toString();

    const carePlanRecurring = await prisma.carePlan.create({
        data: {
            name: 'diabetes',
            screenName: 'Diabetes',
            type: "Recurring",
            description: 'This is the initial care plan for the member.',
            trailId: trailId,
            memberId: memberId,
            nurseId: nurseId,
        },
    });

    const carePlanProgram = await prisma.carePlan.create({
        data: {
            name: 'emagreciemento-consciente',
            screenName: 'Emagrecimento Consciente',
            type: "Program",
            description: 'This is a program care plan for the member.',
            memberId: memberId,
            nurseId: nurseId,
        },
    });

    const typeEvent1 = await prisma.typeEvent.create({
        data: {
            name: 'medicina',
            screenName: 'Medicina',
            description: 'A weekly check-up event for the member.',
        },
    });
    const typeEvent2 = await prisma.typeEvent.create({
        data: {
            name: 'nutricao',
            screenName: 'Nutrição',
            description: 'A weekly check-up event for the member.',
        }
    });

    const carePlanRecurringId = carePlanRecurring.id.toString();
    const carePlanProgramId = carePlanProgram.id.toString();
    const typeEventId1 = typeEvent1.id.toString();
    const typeEventId2 = typeEvent2.id.toString();

    await prisma.event.createMany({
        data: [
            {
                carePlanId: carePlanRecurringId,
                expectedDate: new Date('2023-10-01').toISOString(),
                status: "Agendado",
                specification: 'Primeira consulta',
                typeEventId: typeEventId1,
            },
            {
                carePlanId: carePlanProgramId,
                expectedDate: new Date('2023-10-05').toISOString(),
                status: "Agendado",
                specification: 'Consulta de Segmento',
                typeEventId: typeEventId2,
            },
            {
                carePlanId: carePlanRecurringId,
                expectedDate: new Date('2023-10-08').toISOString(),
                status: "Previsto",
                specification: 'Demanda',
                typeEventId: typeEventId1,
            },
        ],
    });
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });