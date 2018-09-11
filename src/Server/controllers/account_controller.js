import { asyncMiddleware } from '../middlewares/async_middleware'
//Todo: Models
import { accountModel } from '../models/account_model'
//Todo: Utils
import * as PassWordUtil from '../config/password_util'
import { emailSender } from '../config/email_sender'
//Todo: Contants
import * as ErrorMessage from '../config/Contants/error_message_contants'
import { throws } from 'assert';

export const signUp = async (req, res, next) => {
    const passWord = await PassWordUtil.hashPassWordAsync(req.body.formData.password);
    let newAccount = new accountModel({
        first_name: req.body.formData.firstName,
        last_name: req.body.formData.lastName,
        email: req.body.formData.emailAddress,
        profile_name: `${req.body.formData.firstName} ${req.body.formData.lastName}`,
        password: passWord,
        phone_number: req.body.formData.phoneNumber,
        gender: null,
        level: "Member1",
        active: false,
        avatar: null
    });
    let data = await newAccount.save();
    if (data) {
        res.locals.status = 200;
        res.locals.data = data;
        let email = req.body.formData.emailAddress;
        let emailEncoded = new Buffer(email).toString('base64');
        try {
            //emailSender(email, emailEncoded, 'SIGN_UP_VERIFY');
        } catch (error) {
            console.log("Error");
            throw error
        }
    }
    else {
        res.locals.status = 203;
        res.locals.message = "Error";
    }
    next();
};
export const checkEmailAddress = async (req, res, next) => {
    let email = req.query.email;
    const data = await accountModel.find({ email });
    if (data.length > 0) {
        res.locals.status = 203;
    }
    else{
        res.locals.status = 200;
    }
    next();
}