import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
      return;
    }

    try {
      const { data } = await clienteAxios.post("/usuarios/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 4000);
    }
  };

  const { msg } = alerta;

  return (
    <div
    class="container3"
    >
      <div class="app" >
        <h1 class="app-title">
        Helping{"  "}Us
        </h1>
      </div>

      {msg && <Alerta alerta={alerta} />}
      <form class="" onSubmit={handleSubmit}>
        <div className=""></div>

        <label class="app-texto" htmlFor="email">
          Correo
        </label>
        <div class="control-group">
          <div className=""></div>
          <input
            id="email"
            type="email"
            placeholder="Correo"
            class="login-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <label class="app-texto" htmlFor="email">
          Contraseña
        </label>

        <div class="control-group">
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            class="login-field "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="control-group">
          <input type="submit" value="Ingresar" class="" />
          <Link className="" to="/olvide-password">
            ¿Olvidaste tu ? <span className="">Contraseña</span>
          </Link>
        </div>
        <div className="flex items-center justify-center p-2">
          <Link to={"/"} className="">
            
          </Link>
        </div>
      </form>
      <nav className="lg:flex p-4 justify-center"></nav>
    </div>
  );
};

export default LoginAdmin;
