import express from 'express'
import auth from '../middleware/auth.middleware.js'

import {
  register,
  login,
  refresh,
  application,
  me, updateMe, logout
} from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/application', application)
router.patch('/me', auth, updateMe)
router.post('/logout', logout)

// 🔒 ЗАЩИЩЁННЫЙ РОУТ
router.get('/me', auth, me)

export default router
