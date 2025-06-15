import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

const createCarePlan = () => {

    const prisma = new PrismaClient();

    const tryCreateRecurringCarePlan = async (args) => {
        const existingActiveRecurringCarePlan = await prisma.carePlan.findFirst({
            where: {
                memberId: args.memberId,
                type: "Recurring",
                isActive: true
            }
        });

        // Check if there is an existing active care plan for the member
        if (existingActiveRecurringCarePlan) {
            // If an active care plan already exists for the member, throw an error
            throw new GraphQLError('Already have CarePlan recurring active', {
                extensions: {
                    code: 'INVALID_OPERATION',
                    http: { status: 400 }
                }
            });
        }
        return prisma.carePlan.create({ data: args })
    };

    const tryCreateProgramCarePlan = async (args) => {
        const programCarePlan = await prisma.carePlan.findMany({
            where: {
                memberId: args.memberId,
                type: "Program",
                isActive: true
            }
        });

        // Check if there is an existing 3 active care plan for the member
        if (programCarePlan.length > 2) {
            throw new GraphQLError('Already have 3 CarePlans program active', {
                extensions: {
                    code: 'INVALID_OPERATION',
                    http: { status: 400 }
                }
            });
        }
        return prisma.carePlan.create({ data: args })
    };

    const create = async (args: any) => {
        if (args.type == "Recurring")
            return tryCreateRecurringCarePlan(args)
        if (args.type == "Program")
            return tryCreateProgramCarePlan(args)
    };

    return {
        create
    };
}

export default createCarePlan