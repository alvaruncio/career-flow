import { Router } from 'express'
import cookieParser from 'cookie-parser'
import { AuthController } from '../../controllers/auth/auth.controller.js'
import { validateCreateUser } from '../../validators/user/user.validator.js'
import { requireAuth } from '../../middlewares/auth/auth.middleware.js'

export const authRouter = Router()

authRouter.post('/register', validateCreateUser, AuthController.register)
authRouter.post('/login', AuthController.login)
authRouter.post('/refresh', cookieParser(), AuthController.refresh)
authRouter.post('/logout', AuthController.logout)
authRouter.get('/me', requireAuth, AuthController.me)
