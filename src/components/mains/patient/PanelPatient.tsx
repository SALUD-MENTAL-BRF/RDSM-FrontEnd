import React from "react";
import "../../../assets/style/HomePatient/PanelPatient.css";

export const PanelPatient: React.FC = () => {
    return(
        <main className="container">
            {/* <div className="searchContainer-patient" >
                <input type="text"  placeholder="¿Que estás buscando?" />
                <button type="button" >Buscar</button>
            </div> */}
            <div className="row">
                <div className="col">
                    <div className="containerCard-patient">
                        <div className='main-patient'>
                            <img className='imageOptient-patient ms-3'id="act-img" src="/home-patient/actividades.png"/>
                            <h2 className="text-center">Actividades</h2>
                            <p className='description text-center mt-3 mb-4'>Revisa tus actividades diarias.</p>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="containerCard-patient">
                        <div className='main-patient'>
                            <img className='imageOptient-patient ms-3' src="/home-patient/comunidad.jpg"/>
                            <h2 className="text-center">Comunidad</h2>
                            <p className='description text-center'>Puedes leer distintas experiencias.</p>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="containerCard-patient">
                        <div className='main-patient'>
                            <img className='imageOptient-patient ms-3' src="/home-patient/diario.jpg"/>
                            <h2 className="text-center">Diario</h2>
                            <p className='description text-center'>Escribe tus pensamientios en tu diario personal.</p>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}