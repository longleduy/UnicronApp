import { makeExecutableSchema } from 'graphql-tools'
import { gql } from 'apollo-server-express'
import { typeDefs as userAccountSchma, resolvers as userAccountResolver } from './user_account/user_account_schema'
import { typeDefs as postSchema, resolvers as postResolver} from './posts/posts'
const Query = gql`
    type Query {
        _empty: String
    }
`
const Mutation = gql`
    type Mutation {
        _empty: String
    }
`
export const schema = makeExecutableSchema({
    typeDefs: [Query,Mutation, userAccountSchma,postSchema],
    resolvers: [userAccountResolver,postResolver]
})