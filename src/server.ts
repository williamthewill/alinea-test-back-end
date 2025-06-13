import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { readFileSync } from 'fs';
import path from 'path';
import userResolvers from './contexts/user/resolvers';
import postResolvers from './contexts/post/resolvers';

dotenv.config();

const typeDefs = readFileSync(path.join('src/', 'schema.graphql'), 'utf8');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers: [userResolvers, postResolvers],
});

async function startServer() {
    const app = express();
    const server = new ApolloServer({ schema });
    await server.start();

    app.use(cors(), bodyParser.json(), expressMiddleware(server));
    app.listen({ port: 4000 }, () => {
        console.log('Server ready at http://localhost:4000/graphql');
    });
}

startServer();