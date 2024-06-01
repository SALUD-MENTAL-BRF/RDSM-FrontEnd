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
                            <img className='tokenImage ms-3' src="/home-patient/Comunidad.jpg"/>
                            <h2 className="text-center">Comunidad</h2>
                            <p className='description text-center'>Puedes leer distintas experiencias.</p>
                            <hr />
                        </div>
                    </div>
                </div>
                <div className="col">
                    <p>Actividades</p>
                </div>
            </div>
        </main>
    )
}