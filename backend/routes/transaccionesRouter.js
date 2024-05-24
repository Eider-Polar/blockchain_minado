import express from 'express'
import { nuevaTransaccion,verCadena } from '../controllers/transacciones.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.post('/:campa',checkAuth, nuevaTransaccion)

router.get('/ver',verCadena)


export default router
