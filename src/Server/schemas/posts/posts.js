import { gql } from 'apollo-server-express'
import {getAllPost, getLimitedPosts,getPostInfo,getCountInfo} from '../../controllers/posts/posts_controller'
import { authorizationMiddleWare } from '../../middlewares/auth_middleware'
export const typeDefs = gql`
    type Post {
        _id: String
        author: String!
        content: String!
        date: String!
        time: String!
        role: String!
        info: PostInfo
    }
    type PostInfo {
        post_id: String!
        count:Count
        first_cmt_author: String
        first_comment: String
    }
    type Like{
        member: String!
    }
    type Count{
        like: Int!
        liked: Boolean!
        comment: Int!
        view: Int!
    }
    extend type Query{
        getAllPost: [Post]
        getLimitedPosts(limitNumber: Int!):[Post]
    }
`;
export const resolvers = {
    Query: {
        getAllPost: async (obj, args, { req, res }) => {
            const data = await authorizationMiddleWare(req, res, getAllPost);
            return data;
        },
        getLimitedPosts: async (obj, args, { req, res }) => {
            const data = await authorizationMiddleWare(req, res, getLimitedPosts,args.limitNumber);
            return data;
        }
    },
    Post:{
        info: async (obj, args,{ req, res }) => {
            const data = await getPostInfo(obj.id);
            return data;
        } 
    },
    PostInfo: {

        count: async (obj, args,{ req, res }) => {
            const data = await getCountInfo(obj.post_id);
            return data;
        }
    }
}