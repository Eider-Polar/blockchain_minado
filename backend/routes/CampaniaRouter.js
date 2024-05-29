import express from 'express'
import { nuevaCampania,verCampanias} from '../controllers/campaniasCTR.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.post('/:id', nuevaCampania)
router.get('/campanias',verCampanias)


export default router
