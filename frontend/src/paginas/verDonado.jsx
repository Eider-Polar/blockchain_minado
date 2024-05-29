import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";

const VerDonado = () => {
  const [reporte, setReporte] = useState({});
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const cargarCampanias = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clienteAxios("/transaccion/donado");
        setReporte(data);
      } catch (error) {
        console.log(error);
      }
    };
    cargarCampanias();
  }, []);

  console.log(reporte);

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripcion</th>
          <th>objetivoMonto</th>
          <th>cantidadActual</th>
          <th>Cantidad</th>
          
        </tr>
      </thead>
      <tbody>
        {reporte.length ? (
          reporte.map((proyecto) => (
            <tr key={proyecto._id}>
              <td>
                <a href="#" className="transaction-link">
                  {proyecto.nombre}
                </a>
              </td>
              <td>{proyecto.descripcion}</td>
              <td>$ {proyecto.objetivoMonto}</td>
              <td>$ {proyecto.cantidadActual}</td>
              <td>{new Date(proyecto.fechafinalizacionCampania).toLocaleString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center text-gray-600 uppercase p-5">
                no hay campañas activas 
                
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default VerDonado;
