import { Link } from "react-router-dom";

export const ButtonsLoginRegister: React.FC = () => {
  return (
    <>
      <Link to="/login" type="button" className="btn Header__buttons-login">
        Iniciar Sesión
      </Link>
      <Link
        to="/register"
        type="button"
        className="btn Header__buttons-register"
      >
        Registrarse
      </Link>
    </>
  );
};
