import React from "react";
import "../../../assets/style/HomePatient/PanelPatient.css";
import { Aside } from "../../../assets/style/aside/Aside";

export const Options: React.FC = () => {
    return (
        <main className="container-patient">
            <div className="row w-100">
                <section className="aside-patient col-1 d-flex justify-content-center p-3">
                    <Aside/>
                </section>
                <section className="col mt-5 options-container">
                    <div className="row justify-content-space-between">
                        <div className="col-3 text-end">
                            <div className="container-img-patient">
                                <img className="img-actividades" src="home-patient/actividades.webp" alt="" />
                                <figcaption>Actividades</figcaption>
                            </div>
                            <div className="container-img-patient mt-4">
                                <img className="img-diario" src="home-patient/diario.webp" alt="" />
                                <figcaption>Diario</figcaption>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="container-img-patient">
                                <img className="imgPsicologo" src="home-patient/psicologo.webp" alt="" />
                                <figcaption className="text-end">Profesional</figcaption>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};
