import React from "react";
import "../../../assets/style/HomePatient/PanelPatient.css";

export const OptionsPatient: React.FC = () => {
    return (
        <main className="container-patient">
            <div className="container">
                {/* <div className="searchContainer-patient" >
                    <input type="text"  placeholder="¿Que estás buscando?" />
                    <button type="button" >Buscar</button>
                </div> */}
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-12 mb-4">
                        <div className="containerCard-patient">
                            <div className="main-patient">
                                <img className="imageOptient-patient ms-3" id="act-img" src="/home-patient/actividades.png" alt="Actividades"/>
                                <h2 className="text-center">Actividades</h2>
                                <p className="description text-center mt-3 mb-4">Revisa tus actividades diarias.</p>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 mb-4">
                        <div className="containerCard-patient">
                            <div className="main-patient">
                                <img className="imageOptient-patient ms-3" src="/home-patient/Comunidad.jpg" alt="Comunidad"/>
                                <h2 className="text-center">Comunidad</h2>
                                <p className="description text-center">Puedes leer distintas experiencias.</p>
                                <hr />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 col-12 mb-4">
                        <div className="containerCard-patient">
                            <div className="main-patient">
                                <img className="imageOptient-patient ms-3" src="/home-patient/diario.jpg" alt="Diario"/>
                                <h2 className="text-center">Diario</h2>
                                <p className="description text-center">Escribe tus pensamientos en tu diario personal.</p>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
