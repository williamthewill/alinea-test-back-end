import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const member = await prisma.user.create({
        data: {
            name: 'John Doe',
            phone: '1234567890',
            email: 'johndoe@email.com',
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
            screenName: 'Initial Trail',
        },
    });

    const nurseId = nurse.id.toString();
    const memberId = member.id.toString();
    const adminId = admin.id.toString();
    const trailId = trail.id.toString();

    const carePlanRecurring = await prisma.carePlan.create({
        data: {
            name: 'Initial Care Plan',
            screenName: 'initial-care-plan',
            type: "Recurring",
            description: 'This is the initial care plan for the member.',
            trailId: trailId,
            memberId: memberId,
            nurseId: nurseId,
        },
    });

    const carePlanProgram = await prisma.carePlan.create({
        data: {
            name: 'Program Care Plan',
            screenName: 'program-care-plan',
            type: "Program",
            description: 'This is a program care plan for the member.',
            memberId: memberId,
            nurseId: nurseId,
        },
    });

    const typeEvent = await prisma.typeEvent.create({
        data: {
            name: 'Weekly Check-up',
            description: 'A weekly check-up event for the member.',
        },
    });

    const carePlanRecurringId = carePlanRecurring.id.toString();
    const carePlanProgramId = carePlanProgram.id.toString();
    const typeEventId = typeEvent.id.toString();

    await prisma.event.createMany({
        data: [
            {
                carePlanId: carePlanRecurringId,
                expectedDate: new Date('2023-10-01').toISOString(),
                status: "Agendado",
                specification: 'Weekly check-up',
                typeEventId: typeEventId,
            },
            {
                carePlanId: carePlanProgramId,
                expectedDate: new Date('2023-10-05').toISOString(),
                status: "Agendado",
                specification: 'Monthly program review',
                typeEventId: typeEventId,
            },
            {
                carePlanId: carePlanRecurringId,
                expectedDate: new Date('2023-10-08').toISOString(),
                status: "Previsto",
                specification: 'Follow-up on weekly check-up',
                typeEventId: typeEventId,
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