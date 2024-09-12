import { useNavigate } from "react-router-dom";
import '../../../assets/style/professional/PatientList.css'
import { useState } from "react";
import { PatientList } from "./PatientList";

export const PatientManagement = () => {

    const navigate = useNavigate()
    const [fullscreenState, setfullscreen] = useState<boolean>(true)

    const changeFulscree = ():void => {
         setfullscreen(!fullscreenState)
    } 
    return(
        <main className="container-fluid">
            <div className="row w-100">


                <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center">
                        <div role='button' onClick={() => navigate('/home')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                            </svg>
                            <h6 className='ms-1'>Atrás</h6>
                        </div>
                </section>
                <PatientList changeFulscree={changeFulscree} fullscreenState={fullscreenState}/>
                <section className="info-patient col mt-2 ms-2 m-2 rounded-4">
                    <div className="text-center">
                        <img className="rounded-5 mt-2" src="/image-example/imageUser.jpg" alt="" />
                        <p className="info-patient-title mt-1">Nombre</p>
                        <div className="row">
                            <div className="mt-4 mb-3">
                            <button className="btn btn-primary" type="submit">Información</button>
                            </div>
                            <div className="mt-2 mb-3">
                                <button className="btn btn-primary">Actividades</button>
                            </div>
                            <div className="mt-2 mb-3">
                                <button className="btn btn-primary">Contactar</button>
                            </div>
                        </div>
                    </div>
                </section>                
            </div>
        </main>
    )
}