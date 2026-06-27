import { Router } from 'express'
import { usersRouter } from './user/user.routes.js'
import { authRouter } from './auth/auth.routes.js'

const api = Router()

api.use('/users', usersRouter)
api.use('/auth', authRouter)

export { api }
