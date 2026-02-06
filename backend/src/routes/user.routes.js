import { Router } from 'express'
import auth from '../middleware/auth.middleware.js'
import adminOnly from '../middleware/admin.middleware.js'
import {
  getUsers,
  deleteUser,
  updateUser, getUserById
} from '../controllers/user.controller.js'

const router = Router()

router.get('/', auth, adminOnly, getUsers)
router.get('/:id', auth, adminOnly, getUserById)
router.delete('/:id', auth, adminOnly, deleteUser)
router.patch('/:id/role', auth, adminOnly, updateUser)

export default router
