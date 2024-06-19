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
                        <div className="col-3">
                            <div>
                                <img className="img-actividades" src="home-patient/actividades.webp" alt="" />
                            </div>
                            <div>
                                <img className="img-diario" src="home-patient/diario.webp" alt="" />
                            </div>
                        </div>
                        <div className="col-6 text-start">
                            <div>
                                <img className="imgPsicologo" src="home-patient/psicologo.webp" alt="" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};
