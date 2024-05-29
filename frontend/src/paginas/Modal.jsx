// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Alerta from "../components/Alerta";
// import clienteAxios from "../config/clienteAxios";
// import useAuth from "../hooks/useAuth";

// const Modal = () => {
//   const [cuentaBAncaria,setCuentaBAncaria]=useState()
//   const[montoDonado,setMontoDonado]=useState()
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(montoDonado)
//     const nuevoProyecto = async (dado) => {
//       console.log(dado)
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;
//         const config = {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         };
//         const { data } = await clienteAxios.post("/transaccion/665161dc4c35ee9b06e2ecc6", dado, config);
//        console.log(data)
//        navigate("/");

       
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     nuevoProyecto({montoDonado,cuentaBAncaria})
//     }
//   return (
//     <>
//     <form onSubmit={handleSubmit}>
//       <div class="container2">
//         <h2>DONAVIDA AYUDA</h2>
//         <div class="input-group">
//           <label for="origen">Nombre del Donante:</label>
//           <input
//             type="text"
//             id="origen"
//             placeholder="Tu Nombre"
//           />
//         </div>
//         <div class="input-group">
//           <label for="origen">Cuenta de Origen:</label>
//           <input
//             type="text"
//             id="origen"
//             placeholder="Número de cuenta origen"
//             onChange={(e) => setCuentaBAncaria(e.target.value)}

//           />
//         </div>
//         <div class="input-group">
//           <label for="destino">Cuenta de Destino:</label>
//           <input
//             type="text"
//             id="destino"
//             placeholder="Número de cuenta destino"
//           />
//         </div>
//         <div class="input-group">
//           <label for="monto">Monto a Transferir:</label>
//           <input type="text" id="monto" placeholder="Ingrese el monto"             onChange={(e) => setMontoDonado(e.target.value)}
// />
//         </div>
//          <input type="submit" value="Ingresar" class="" /> 

//         <button type="submit" class="btn" >
//           Transferir
//         </button>
//       </div>
//       </form>
//     </>
//   );
// };

// export default Modal;
