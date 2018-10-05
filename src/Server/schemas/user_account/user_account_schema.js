import { gql } from 'apollo-server-express'
import * as userAccountController from '../../controllers/user_account/user_account_controller'
import * as errorHandler from '../../config/error_handler'
export const typeDefs = gql`
interface  UserAccountInterface{
        first_name: String
        last_name: String
        email: String
        profile_name: String
        password: String
        phone_number: String
        gender: String
        level: String
        active: Boolean
        avatar: String 
        test:String
    }
    type UserAccount implements UserAccountInterface{
        first_name: String
        last_name: String
        email: String
        profile_name: String
        password: String
        phone_number: String
        gender: String
        level: String
        active: Boolean
        avatar: String 
        test:String
    }
    type SignInInfo implements UserAccountInterface{
        first_name: String
        last_name: String
        email: String
        profile_name: String
        password: String
        phone_number: String
        gender: String
        level: String
        active: Boolean
        avatar: String 
        test:String
        jwt: String 
    }
    input formData {
        first_name: String
        last_name: String
        email: String
        profile_name: String
        password: String
        phone_number: String
        gender: String
        level: String
        active: Boolean,
        avatar: String 
    }
    type checkEmail {
        status: Boolean
    }
    type verifyEmail {
        status: String
    }
    extend type Query{
        checkEmail(email: String!): checkEmail
        verifyEmailAddress(secretKey: String!): verifyEmail
    }
    extend type Mutation {
        addNewUserAccount(formData: formData):UserAccountInterface
        signIn(formData: formData): UserAccountInterface
    }
`;
export const resolvers = {
    Query: {
        checkEmail:  (obj, args, context) => {
            return userAccountController.checkEmailAddress(args.email);
        },
        verifyEmailAddress:(obj, args, context) => {
            return userAccountController.verifyEmailAddress(args.secretKey);
        }
    },
    Mutation: {
        addNewUserAccount: (obj, args, context) => {
            return userAccountController.addNewUserAccount(args.formData);
        },
        signIn: async (obj, args, {req}) => {
            const user =await userAccountController.signIn(args.formData);
            return user;
        }
    },
    UserAccountInterface: {
        __resolveType(obj, context, info){
          if(obj.jwt){
            return 'SignInInfo';
          }
          return 'UserAccount';
        },
      },
}