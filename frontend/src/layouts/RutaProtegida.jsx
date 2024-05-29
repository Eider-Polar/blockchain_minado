import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar_A from "../components/Sidebar_A";

function RutaProtegida() {
  const { auth, cargando } = useAuth();
  if (cargando) return (<div className="text-center">
  <div role="status">
    
    <span className="font-black text-xl ml-4 capitalize">Cargando...</span>
  </div>
</div>);
  return (
    <>
      {auth._id ? (
        <div className="flex">
          <div className="basis-[15%] h-full border">
            <Sidebar_A />
          </div>
          <div className="basis-[85%] border">
            <Header />
            <div>
              <Outlet></Outlet>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default RutaProtegida;
