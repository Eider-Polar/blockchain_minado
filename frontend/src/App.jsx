import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authlayout from "./layouts/Authlayout";
import RutaProtegida from "./layouts/RutaProtegida";
import CoorLayout from "./layouts/CoorLayout";
import LayoutSe from "./layouts/LayoutSe.jsx";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import NuevoPassword from "./paginas/NuevoPassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import Aloguin from "./paginas/Aloguin";
import Aviso from "./paginas/Aviso";
import LoginAdmin from "./paginas/LoginAdmin.jsx";
import Admin from "./paginas/Admin.jsx";
import Principal from "./paginas/Principal.jsx";
import { AuthProvider } from "./context/AuthProvider";
import ReportexUsuario from "./paginas/ReporteXusuario.jsx";
import CadenaEntera from "./paginas/CadenaEntera.jsx";
import VerDonado from "./paginas/verDonado.jsx";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Authlayout />}>
            <Route index element={<Principal />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:id" element={<NuevoPassword />} />
            <Route path="/Iniciar_sesion" element={<LoginAdmin />} />
            <Route path="/reporte_por_Usuario" element={<ReportexUsuario />} />
          </Route>
          <Route path="/cadenaEntera" element={<CadenaEntera />} />
          <Route path="/ver_donado" element={<VerDonado/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App;
