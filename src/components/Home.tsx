import { Header } from "./headers/Header";
import img from "/LandingPage/img.jpg";
import "../assets/style/home/Home.css";
import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="Home__Main">
        <section className="Home__Main-hero">
          <div className="Home__Main-hero-content">
            <h1 className="Home__Main-hero-title">
              Tu bienestar mental al alcance de tu mano
            </h1>
            <p className="Home__Main-hero-subtitle">
              Accede a terapia online, grupos de apoyo, recursos educativos y
              más
            </p>
            <ul className="Home__Main-hero-list">
              <li className="Home__Main-hero-list-item">
                <span className="material-symbols-outlined">asterisk</span>
                Comunicación en línea con profesionales de confianza.
              </li>
              <li className="Home__Main-hero-list-item">
                <span className="material-symbols-outlined">asterisk</span>
                Grupos de apoyo disponibles 24/7.
              </li>
              <li className="Home__Main-hero-list-item">
                <span className="material-symbols-outlined">asterisk</span>
                Recursos educativos personalizados.
              </li>
            </ul>
            <Link to="/" className="cta-button">Empieza tu terapia</Link>
          </div>
          <div className="Home__Main-imageContainer">
            <img
              className="Home__Main-imageContainer-image"
              src={img}
              alt="Persona meditando"
            />
          </div>
        </section>
    
      </div>
    </>
  );
};
