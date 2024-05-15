import "../assets/style/Home.css";
import { HeaderWithoutLoggedIn } from "./headers/HeaderWithoutLoggedIn";

export const Home: React.FC = () => {
  return (
    <>
      <HeaderWithoutLoggedIn />
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
