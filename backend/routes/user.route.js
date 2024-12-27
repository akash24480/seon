import {Router} from 'express'
import * as userController from '../controllers/user.controller.js'
import { body } from 'express-validator';

const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('Email must be valid email id'),
    body('password').isLength({min : 3}).withMessage('Password must be 3 letters long'),
     userController.createUserController)