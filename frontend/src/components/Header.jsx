import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "./Modal";

function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const isUserLogged = () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }

  const navigate = useNavigate();

  const handleClose = () => {
    setModalVisible(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setModalVisible(false);
    setIsLogged(false);
    navigate("/");
  };

  useEffect(() => {
    isUserLogged();
    return () => {
    }
  }, [])
  

  return (
    <header class="header">
      <div class="menu margen-interno">
        <div class="logo">
          <a href="prueba.html">DonaVida</a>
        </div>
        <nav class="nav">
          <a href="#">
            <Link to={"/reporte_por_Usuario"}>
              <i class="fa-regular fa-file-lines"></i>
              <span class="off">Reportes</span>
            </Link>
          </a>
          <Link to={"/cadenaEntera"}>
            <i class="fa-regular fa-file-lines"></i>
            <span class="off">Cadena Entera </span>
          </Link>
          <Link to={"/ver_donado"}>
            <i class="fa-regular fa-file-lines"></i>
            <span class="off">ver donado</span>
          </Link>
        </nav>
        <div class="social">
          <div></div>
          {!isLogged ? (
            <>
              <Link
                to="/Iniciar_sesion"
                className="bg-Secundario_2 w-9/12 p-2 text-white capitalize font-bold block mt-5 text-center rounded-full hover:bg-white hover:border-Principal_1 hover:border-2 hover:text-black"
              >
                Iniciar sesion{" "}
              </Link>
              <div>
                <a href="#">/</a>
              </div>
              <div>
                <a href="#">Registrate</a>
              </div>
            </>
          ) : (
            <></>
          )}
          <button
            onClick={handleLogout}
            type="button"
            className="logoutButton"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
      <div class="texto-principal margen-interno">
        <h1>
          Juntos podemos marcar la diferencia. Cada donación, por pequeña que
          sea, es un paso hacia un mundo mejor. Tu generosidad puede cambiar
          vidas, brindar esperanza y construir un futuro más brillante para
          aquellos que más lo necesitan. Únete a nosotros en esta misión de
          solidaridad y apoyo mutuo. ¡Cada acto de generosidad cuenta!
        </h1>
      </div>
    </header>
  );
}

export default Header;
