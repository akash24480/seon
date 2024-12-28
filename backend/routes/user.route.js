import {Router} from 'express'
import * as userController from '../controllers/user.controller.js'
import { body } from 'express-validator';
import * as authMiddleWare from '../middleware/auth.middleware.js'


const router = Router();

router.post('/register',
    body('email').isEmail().withMessage('Email must be valid email id'),
    body('password').isLength({min : 3}).withMessage('Password must be 3 letters long'),
     userController.createUserController
    )

    //  Login route
router.post('/login',
    body('email').isEmail().withMessage('Email must be valid mail id'),
    body('password').isLength({min : 3}).withMessage('Password must be 3 letters long'),
    userController.loginController
)

router.get('/profile',authMiddleWare.authUser, userController.profileController)


router.get('/logout', userController.logoutController)

export default router;