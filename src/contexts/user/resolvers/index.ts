import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const resolver = {
    Query: {
        users: () => prisma.user.findMany({ include: { posts: true } }),
    },
    Mutation: {
        createUser: (_, args) => prisma.user.create({ data: args }),
        updateUser: (_, args) => {
            const { id, ...data } = args;
            return prisma.user.update({ where: { id }, data });
        },
    },
    User: {
        posts: (parent) => prisma.post.findMany({ where: { userId: parent.id } }),
    }
};

export default resolver;