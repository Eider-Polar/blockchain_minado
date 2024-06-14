import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.routes.js";
import conectarDB from "./config/db.js";
import Blockchain from "./src/blockcahain.js";
import P2Pserver from "./app/p2pServer.js"
import bodyParser from "body-parser";
import CampaniaRouter from "./routes/CampaniaRouter.js"
import OrganizacionRouter from "./routes/OrganizacionRouter.js"
import transaccionesRouter from "./routes/transaccionesRouter.js"


const bc = new Blockchain();
const p2pserver=new P2Pserver(bc);
const app = express();
app.use(express.json());

dotenv.config();
conectarDB();
app.use(cors());
 
app.use("/api/organizacion", OrganizacionRouter)
app.use("/api/campania",CampaniaRouter)
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/transaccion",transaccionesRouter)
app.use(bodyParser.json())


const PORT =  3000;

app.listen(3000, () => {
  console.log(`listening on port ${PORT}`);
});
p2pserver.syncChains(bc);
p2pserver.listen()
