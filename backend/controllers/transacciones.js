import Blockchain from "../src/blockcahain.js";
import P2Pserver from "../app/p2pServer.js";
import Transaccion from "../models/transaccion.js";
import campania from "../models/campanias.js";
import Usuario from "../models/Usuario.js";
import organizacion from "../models/organizaciones.js";
import mongoose from "mongoose";
const bc = new Blockchain();
const P2pserver = new P2Pserver();
const nuevaTransaccion = async (req, res) => {
  const { campa } = req.params;

  const data = req.body;
  try {
    const CAMPANIAG = await campania.findOne({ _id: campa });
    const cambio = parseInt(data.montoDonado);
    CAMPANIAG.cantidadActual = CAMPANIAG.cantidadActual + cambio;
    await CAMPANIAG.save();
    const y =   CAMPANIAG._id.valueOf()
    console.log(y)
    const cuentaOrganizacion = await organizacion.findOne({
      campanias: y
    });
  
    console.log(cuentaOrganizacion);
    data.usuario = req.usuario._id;
    data.campaniabenefica = campa;
     data.cuenta_Organizacion=cuentaOrganizacion.cuentaBAncaria
    const block = bc.addBlock(data);
    console.log(`New Block add: ${block.toString()}`);
    P2pserver.syncChains();
    data.hashDelBloque = block.hash;
    const TransaccionN = new Transaccion(data);
    const TGuardada = await TransaccionN.save();
    res.json(TGuardada);
  } catch (error) {
    console.log(error);
  }
};
const verCadena = async (req, res) => {
  res.json(bc.chain);
};
const verTransaccionesxUsuario = async (req, res) => {
  const bloques = {};

  const promises = bc.chain.map(async (element) => {
    try {
      const usuario = await Usuario.findOne({ _id: element.data.usuario });
      if (usuario && usuario.nombre) {
        if (!bloques[usuario.nombre]) {
          bloques[usuario.nombre] = [];
        }
        bloques[usuario.nombre].push(element);
      } else {
        console.error(
          `Usuario no encontrado para el ID: ${element.data.usuario}`
        );
      }
    } catch (error) {
      console.error(
        `Error buscando el usuario con ID: ${element.data.usuario}`,
        error
      );
    }
  });

  await Promise.all(promises);

  res.json(bloques);
};
export { nuevaTransaccion, verCadena, verTransaccionesxUsuario };
