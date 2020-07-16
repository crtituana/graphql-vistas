import fs from 'fs'
import path from 'path'
import { ApolloServer } from 'apollo-server-express'
import resolvers from './resolvers'
import getUser from './utils/getUser'


const typeDefs = fs
    .readFileSync(path.join(__dirname, "./schema", "schema.graphql"), "utf-8")
    .toString()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || ""
        const userId = getUser(token)
        return { userId }
    }
});

export default server

