import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";

const CadenaEntera = () => {
  const [reporte, setReporte] = useState({});
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const cargarCampanias = async () => {
      
      try {
        const { data } = await clienteAxios("/transaccion/ver");
        setReporte(data);
      } catch (error) {
        console.log(error);
      }
    };
    cargarCampanias();
  }, []);

 console.log(reporte)

  return (
    <table>
      <thead>
        <tr>
          <th>Hash</th>
          <th>Fecha</th>
          <th>Remitente</th>
          <th>Destinatario</th>
          <th>Cantidad</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {reporte.length ? (
          reporte.map((proyecto) => (
            <tr key={proyecto.hash}>
              <td>
                <a href="#" className="transaction-link">
                  {proyecto.hash}
                </a>
              </td>
              <td>{new Date(proyecto.time).toLocaleString()}</td>
              <td>{proyecto.data.nombre}</td>
              <td>{proyecto.data.Nombre_Organizacion}</td>
              <td>$ {proyecto.data.montoDonado}</td>
              <td className="status success">Confirmado</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center text-gray-600 uppercase p-5">
              no hay cadena 
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CadenaEntera;
