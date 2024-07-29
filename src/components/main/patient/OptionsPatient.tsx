import React from "react";
import "../../../assets/style/HomePatient/PanelPatient.css";
import { Aside } from "../../aside/Aside";
import { useNavigate } from 'react-router-dom'

export const OptionsPatient: React.FC = () => {

    const navigate = useNavigate();

    return (
        <main className="container-fluid container-patient">
            <div className="row w-100">
                <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center aside-patient">
                    <Aside/>
                </section>
                <section className="col-10 col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-11 mt-5 options-container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-3 text-md-end text-center">
                            <div className="container-img-patient">
                                <img className="img-actividades img-fluid" src="home-patient/actividades.webp" alt="Actividades" />
                                <figcaption className="text-black">Actividades</figcaption>
                            </div>
                            <div className="container-img-patient mt-4" onClick={() =>  navigate("/personalDiary")}>
                                <img className="img-diario img-fluid" src="home-patient/diario.webp" alt="Diario"/>
                                <figcaption>Diario</figcaption>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 text-center">
                            <div className="container-img-patient">
                                <img className="imgPsicologo img-fluid" src="home-patient/psicologo.webp" alt="Profesional" />
                                <figcaption className="text-md-end">Profesional</figcaption>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};
