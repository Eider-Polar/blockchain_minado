import { useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";
import Header from "../components/Header";
const ReportexUsuario = () => {
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
      }
      try {
        const { data } = await clienteAxios("/transaccion/verXusuario", config);
        setReporte(data);
      } catch (error) {
        console.log(error);
      }
    };
    cargarCampanias();
  }, []);

  useEffect(() => {
    if (reporte && Object.keys(reporte).length > 0) {
      const newList = [];
      for (const key in reporte) {
        if (Object.hasOwnProperty.call(reporte, key)) {
          newList.push(...reporte[key]);
        }
      }
      setLista(newList);
    }
  }, [reporte]);
  console.log(lista)

  return (
    <>
    <Header />

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
        {lista.length ? (
          lista.map((proyecto) => (
            <tr key={proyecto.hash}>
              <td>
                <a href="#" className="transaction-link">
                  {proyecto.hash}
                </a>
              </td>
              <td>{new Date(proyecto.time).toLocaleString()}</td>
              <td>{proyecto.data.cuentaBAncaria
}</td>
              <td>{proyecto.data.cuenta_Organizacion}</td>
              <td>$ {proyecto.data.montoDonado}</td>
              <td className="status success">Confirmado</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center text-gray-600 uppercase p-5">
            se debe iniciar sesion para listar sus reportes
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </>
  );
};

export default ReportexUsuario;
