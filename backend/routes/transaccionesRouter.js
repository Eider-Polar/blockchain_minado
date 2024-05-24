import express from 'express'
import { nuevaTransaccion,verCadena, verTransaccionesxUsuario} from '../controllers/transacciones.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.post('/:campa',checkAuth, nuevaTransaccion)

router.get('/ver',verCadena)
router.get('/verXUsuario',checkAuth,verTransaccionesxUsuario)

export default router
