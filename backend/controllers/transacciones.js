import Blockchain from "../src/blockcahain.js";
import P2Pserver from "../app/p2pServer.js";
import Transaccion from "../models/transaccion.js";
import campania from "../models/campanias.js";
const bc = new Blockchain();
const P2pserver = new P2Pserver();
const nuevaTransaccion = async (req, res) => {
  const { campa } = req.params;
  const data = req.body;
  const CAMPANIAG = await campania.findOne({ _id: campa });
  if (CAMPANIAG.cantidadActual === CAMPANIAG.objetivoMonto) {
    const error = new Error("Esta campaña ya alcanzo la meta requerida");
    return res.status(403).json({ msg: error.message });
  }
  const cambio =  parseInt(data.montoDonado)
  CAMPANIAG.cantidadActual= CAMPANIAG.cantidadActual  + cambio
  await CAMPANIAG.save()
  data.usuario = req.usuario._id;
  data.campaniabenefica = campa;

  const block = bc.addBlock(data);
  console.log(`New Block add: ${block.toString()}`);
  P2pserver.syncChains();
  data.hashDelBloque = block.hash;
  const TransaccionN = new Transaccion(data);
  const TGuardada = await TransaccionN.save();
  res.json(TGuardada)
    console.log(bc.chain[1])
};
const verCadena=async(req,res)=>{
  res.json(bc.chain)
}
export { nuevaTransaccion,verCadena };
