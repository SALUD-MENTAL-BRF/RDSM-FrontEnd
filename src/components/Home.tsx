import '../assets/style/style-header/headerWithoutLoggedIn.css';
import { Header } from "./headers/Header";

export const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className="Main">
        <div className="Main__Section-text">
          <div className="Main__Section-text-title">
            <h1 className="abril-fatface-regular">
              Tu bienestar mental al alcance de tu mano
            </h1>
          </div>
        </div>
        <div className="Main__Section-image"></div>
      </div>
    </>
  );
};
