import express from 'express';
import * as AccountController from '../controllers/account_controller'
import {serverRespone} from '../middlewares/respone_middleware'
const router = express.Router();

router.get('/', AccountController.signIn,serverRespone);

export default router;