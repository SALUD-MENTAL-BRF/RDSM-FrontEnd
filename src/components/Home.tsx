import logo from "/Logo/image.png";
import "../assets/style/home.css";

export const Home = () => {
  return (
    <>
      <div className="HeaderHome">
        <div className="HeaderHome__ContainerLogo">
          <img
            className="HeaderHome__ContainerLogo-img"
            src={logo}
            alt="Logo de la aplicación de RDSM"
          />
        </div>
        <div className="HeaderHome__ContainerButtons">
          <a className="HeaderHome__ContainerButtons-buttonLogin" href="#">Iniciar Sesión</a>
          <a className="HeaderHome__ContainerButtons-buttonRegister" href="/register">Registrarse</a>
        </div>
      </div>
    </>
  );      
};
