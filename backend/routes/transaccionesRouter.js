import express from 'express'
import { nuevaTransaccion,verCadena, verTransaccionesxUsuario,verTotalDonado} from '../controllers/transacciones.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.post('/:id',checkAuth, nuevaTransaccion)

router.get('/ver',verCadena)
router.get('/verXUsuario',checkAuth,verTransaccionesxUsuario)
router.get('/donado',verTotalDonado)

export default router
