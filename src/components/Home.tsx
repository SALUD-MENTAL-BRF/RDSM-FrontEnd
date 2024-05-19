import { Header } from "./headers/Header";
import img from '/LandingPage/img.jpg';
import '../assets/style/Home/Home.css';

export const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="Home__Main">
        <section className="Home__Main-hero">
          <div className="Home__Main-hero-content">
            <h1 className="Home__Main-hero-title">Tu bienestar mental al alcance de tu mano</h1>
            <p className="Home__Main-hero-subtitle">Accede a terapia online, grupos de apoyo, recursos educativos y más</p>
            <ul className="Home__Main-hero-list">
              <li className="Home__Main-hero-list-item">Comunicación en línea con profesionales de confianza</li>
              <li className="Home__Main-hero-list-item">Grupos de apoyo disponibles 24/7</li>
              <li className="Home__Main-hero-list-item">Recursos educativos personalizados</li>
            </ul>
          </div>
          <div className="Home__Main-imageContainer">
            <img className="Home__Main-imageContainer-image" src={img} alt="Persona meditando" />
          </div>
        </section>
        <div className="arrow-down">
          <span>&#9660;</span>
        </div>
      </div>
    </>
  );
};
