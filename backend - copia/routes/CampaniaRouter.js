import express from 'express'
import { nuevaCampania } from '../controllers/campaniasCTR.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.post('/:id', nuevaCampania)




export default router
