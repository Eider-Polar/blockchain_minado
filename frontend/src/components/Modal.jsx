import React from "react";
import { FaBaby } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import { on } from "ws";
const Modal = ({ onclose, id }) => {
  const [cuentaBAncaria, setCuentaBAncaria] = useState("");
  const [montoDonado, setMontoDonado] = useState("");
  const navigate = useNavigate();

  console.log(id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevoProyecto = async (dado) => {
      console.log(dado);
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios.post(
          `/transaccion/${id}`,
          dado,
          config
        );
        console.log(data);
        onclose(); //como puedo hacer que onClose sirva aqui
      } catch (error) {
        console.log(error);
      }
    };
    nuevoProyecto({ montoDonado, cuentaBAncaria });
  };

  // Simular la transferencia (en una aplicación real, aquí se realizaría la lógica de la transferencia)
  //alert('Se ha transferido ' + monto + ' de la cuenta ' + origen + ' a la cuenta ' + destino + '.');

  return (
    <form onSubmit={handleSubmit}>
      <alerta></alerta>
      <div class="container2">
        <h2>DONAVIDA AYUDA</h2>

        <div class="input-group">
          <label for="origen">Cuenta de Origen:</label>
          <input
            type="text"
            id="origen"
            placeholder="Número de cuenta origen"
            onChange={(e) => setCuentaBAncaria(e.target.value)}
          />
        </div>

        <div class="input-group">
          <label for="monto">Monto a Donar:</label>
          <input
            type="text"
            id="monto"
            placeholder="Ingrese el monto"
            onChange={(e) => setMontoDonado(e.target.value)}
          />
        </div>
        <button type="submit" class="btn">
          Transferir
        </button>
        <button type="button" class="btn_cancelar" onClick={onclose}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default Modal;
