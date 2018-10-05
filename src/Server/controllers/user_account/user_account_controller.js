//Todo: Model
import { accountModel } from '../../models/account_model'
//Todo: Utils
import * as passWordUtil from '../../config/password_util'
import { emailSender } from '../../config/email_sender'
import {AuthenticationError} from 'apollo-server-express'
import * as commonUtils from '../../config/common'
import * as errorHandler from '../../config/error_handler'
import delay from 'delay'
//Todo: Contants
import * as errorMessageContants from '../../config/Contants/error_message_contants'
export const checkEmailAddress = async (email) => {
    const data = await accountModel.find({ email });
    if (data.length > 0) {
        return {
            status: true
        }
    }
    await delay(2000);
    return {
        status: false
    }
}
export const addNewUserAccount = async (args) => {
    const passWord = await passWordUtil.hashPassWordAsync(args.password);
    let newAccount = new accountModel({
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email,
        profile_name: `${args.first_name} ${args.last_name}`,
        password: passWord,
        phone_number: args.phone_number,
        gender: null,
        level: "lvl1",
        active: false,
        avatar: null
    });
    let data = await newAccount.save();
    let { email } = args;
    let emailEncoded = new Buffer(email).toString('base64');
    //emailSender(email, emailEncoded, 'SIGN_UP_VERIFY');
    return data
};
export const verifyEmailAddress = async (secretKey) => {
    const emailEncoded = secretKey;
    const email = new Buffer(emailEncoded, 'base64').toString('ascii');
    const data = await accountModel.findOneAndUpdate({ email: email, active: false }, { $set: { active: true } });
    if (!data) {
        throw new Error('Email verify invalid')
    }
    return {
        status: "Active"
    }
}
export const signIn = async (formData) => {
    const { email, password } = formData;
    const data = await accountModel.findOne({ email });
    if (data) {
        if (!data.active) {
            throw new errorHandler.dataFormInvalid({
                message: errorMessageContants.ERROR_EMAIL_NOT_VERIFY,
                data: {
                    field: 'email'
                }
            })
        }
        else {
            const verifyPasswordStatus = await passWordUtil.comparePassWordAsync(password, data.password);
            if (!verifyPasswordStatus) {
                throw new errorHandler.dataFormInvalid({
                    message: errorMessageContants.WRONG_PASSWORD,
                    data: {
                        field: 'password'
                    }
                })
            }
            else {
                const payload = {
                    email: data.email,
                    profile_name: data.profile_name,
                    level: data.level
                }
                const jwt = commonUtils.genJWT(payload, process.env.SECRET_KEY, '1h');
                data["jwt"] = jwt
                return data;
            }
        }

    }
    else {
        throw new errorHandler.dataFormInvalid({
            message: errorMessageContants.ACCOUNT_NOT_AVAILABLE,
            data: {
                field: 'email'
            }
        })
    }
}