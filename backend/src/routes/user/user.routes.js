import { Router } from 'express'
import { UserController } from '../../controllers/user/user.controller.js'
import { validateCreateUser } from '../../validators/user/user.validator.js'
import { requireAuth, requireAdmin, requireSelfOrAdmin } from '../../middlewares/auth/auth.middleware.js'

export const usersRouter = Router()

usersRouter.get('/', requireAuth, requireAdmin, UserController.getAll)
usersRouter.get('/:id', requireAuth, requireAdmin, UserController.getById)
usersRouter.post('/', requireAuth, requireAdmin, validateCreateUser, UserController.create)
usersRouter.patch('/:id', requireAuth, requireSelfOrAdmin, UserController.update)
usersRouter.put('/:id', requireAuth, requireSelfOrAdmin, UserController.update)
usersRouter.delete('/:id', requireAuth, requireSelfOrAdmin, UserController.delete)
