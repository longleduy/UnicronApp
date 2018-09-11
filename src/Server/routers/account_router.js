import express from 'express';
import * as AccountController from '../controllers/account_controller'
import {serverRespone} from '../middlewares/respone_middleware'
import {asyncMiddleware} from '../middlewares/async_middleware'
const router = express.Router();

//Todo: Get method
router.get('/check-email-address',asyncMiddleware(AccountController.checkEmailAddress),serverRespone);
//Todo: Post method
router.post('/sign-up',asyncMiddleware(AccountController.signUp),serverRespone);

export default router;