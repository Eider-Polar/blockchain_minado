import express from 'express'
import { nuevaOrganizacion } from '../controllers/organizacionesCTR.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.post('/', nuevaOrganizacion)




export default router
