import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const resolvers = {
    Query: {
        posts: () => prisma.post.findMany({ include: { user: true } }),
    },
    Mutation: {
        createPost: (_: any, args: any) => prisma.post.create({ data: args }),
        updatePost: (_: any, args: any) => {
            const { id, ...data } = args;
            return prisma.post.update({ where: { id }, data });
        },
    },
    Post: {
        user: (parent: any) => prisma.user.findUnique({ where: { id: parent.userId } }),
    }
};

export default resolvers;