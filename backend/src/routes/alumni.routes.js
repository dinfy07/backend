import { Router } from 'express'
import auth from '../middleware/auth.middleware.js'
import admin from '../middleware/admin.middleware.js'
import {
  getAlumni,
  getAlumniById,
  createAlumni,
  updateAlumni,
  deleteAlumni
} from '../controllers/alumni.controller.js'

const router = Router()

// PUBLIC
router.get('/', getAlumni)
router.get('/:id', getAlumniById)

// ADMIN ONLY
router.post('/', auth, admin, createAlumni)
router.put('/:id', auth, admin, updateAlumni)
router.delete('/:id', auth, admin, deleteAlumni)


export default router
