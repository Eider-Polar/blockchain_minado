import Header from "../components/Header";
import Anciana from "../assets/img/anciana.jpg";
import mine from "../assets/img/mine.jpg";
import ninos from "../assets/img/ninos.jpg";
import pastor from "../assets/img/pastor.png";
import foto1 from "../assets/img/foto1.jpg";
import perritos from "../assets/img/perritos.jpg"
import mocosos from "../assets/img/mosca.jpg"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import utiles from "../assets/img/donacion-utiles-escolares-portada.jpg"

import clienteAxios from "../config/clienteAxios";

const Principal = () => {
  const imageMap = {
    "66525c4277f2570df000fde5": Anciana,
    "66525cafb9bd6d420b6b1826":perritos,
    "665161dc4c35ee9b06e2ecc6": mocosos ,
    "66552399227e1ac8b97539fc":utiles,
    // Añadir más id e imágenes según sea necesario
  };
  const [campania, setCampania] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [identificador,setIdentificador]=useState()
  const navigate = useNavigate();
  useEffect(() => {
    const cargarCampanias = async () => {
      const token = localStorage.getItem("token");

      try {
        const { data } = await clienteAxios("/campania/campanias");
        setCampania(data);
      } catch (error) {
        console.log(error);
      }
    };
    cargarCampanias();
  }, []);
  console.log(campania);


  const handleLogout = ( id) => {
    setModalVisible(true);
    setIdentificador(id)
  };
  const handleClose = () => {
    setModalVisible(false);
  };
  
  return (
    <>
      <Header />
      <section class="section margen-interno">
        <div class="articulos">
          {campania.length ? (
            campania.map((proyecto) => (
              <article class="article" key={proyecto._id}>
                <img src={imageMap[proyecto._id]} alt="" />
                <h3>23 de mayo de 2024</h3>
                <h2>{proyecto.nombre}</h2>
                <p>{proyecto.descripcion}</p>
                <a onClick={()=>handleLogout(proyecto._id)}>Donar</a>
              </article>
            ))
          ) : (
            <p className="text-center text-gray-600 uppercase p-5">
              No hay proyectos
            </p>
          )}
          {modalVisible && (
           <Modal onclose={handleClose} id={identificador} />
         )}
         
        </div>
        <aside class="aside">
          <div class="publicidad">
            <h4>Publicidad</h4>
            <img src={ninos} />
          </div>
          <div class="publicidad">
            <h4>Publicidad</h4>
            <img src={Anciana} />
          </div>
          <div class="publicidad">
            <h4>Publicidad</h4>
            <img src={mine} alt="" />
          </div>
        </aside>
      </section>
    </>
  );
};

export default Principal;
