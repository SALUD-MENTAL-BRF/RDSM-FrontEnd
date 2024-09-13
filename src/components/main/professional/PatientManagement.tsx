import { useNavigate } from "react-router-dom";
import '../../../assets/style/professional/PatientList.css'
import { useEffect, useState } from "react";
import { PatientList } from "./PatientList";
import { patient } from "../../../types/patients.dto";

const pat = [
    {
        "id": 1,
        "fullname": "Veron Rodrigo Gabriel",
        "user":{
            "id": 1,
            "email": "veronrodrigo98@gmail.com",
            "username": "Rodriasd",
            "password": "",
            "imageUrl": "https://lh3.googleusercontent.com/a/ACg8ocK5LmTXencJ6VTXilUuhdYJqDB1zuf4tNSCqriiZSSQp4r-qhn8=s96-c",
            "gooleId": "",
            "roleId": 1
        }
    },
    {
        "id": 2,
        "fullname": "a",
        "user":{
            "id": 1,
            "email": "veronrodrigo98@gmail.com",
            "username": "Rodriasd",
            "password": "",
            "imageUrl": "",
            "gooleId": "",
            "roleId": 1
        }
    }
]

export const PatientManagement = () => {
    const [patientsState, setPatientState] = useState<Array<patient>>([]);
    const [patientSelect, setPatientSelect] = useState<patient | undefined>()
    const navigate = useNavigate();
    const [fullscreenState, setfullscreen] = useState<boolean>(true);

    const changeFulscree = ():void => {
         setfullscreen(!fullscreenState)
    };

    useEffect(() => {
        (
            async () => {
                setPatientState(pat)
            }
        )()
    },[]);

    const updateInfoPatient = (data:any) => {
        setPatientSelect(data)
    }

    const resetPatient = () => {
        setPatientSelect(undefined)
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
                <PatientList updateInfoPatient={updateInfoPatient} patientState={patientsState} changeFulscree={changeFulscree} fullscreenState={fullscreenState}/>
                {
                patientSelect ?
                    <section className="info-patient col mt-2 ms-2 m-2 rounded-4">
                        <div className="text-end w-100">
                        <svg onClick={resetPatient} role="button" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>

                        </div>
                        <div className="text-center">
                            <img src={patientSelect.user.imageUrl.length > 1 ?
                                            patientSelect.user.imageUrl :
                                            "/image-example/imageUser.jpg"
                                    } alt="" style={{width:"150px"}} className=""/>
                            <p className="info-patient-title mt-1">{patientSelect.fullname}</p>
                            <div className="row">
                                <div className="mt-4 mb-3">
                                <button onClick={() => navigate('/information-patient')} className="w-25 btn btn-info text-white" type="submit">Información</button>
                                </div>
                                <div className="mt-2 mb-3">
                                    <button className="w-25 btn btn-info text-white">Actividades</button>
                                </div>
                                <div className="mt-2 mb-3">
                                    <button className="w-25 btn btn-info text-white">Reunión</button>
                                </div>
                                <div className="mt-2 mb-3">
                                    <button className="w-25 btn btn-danger">Derivar</button>
                                </div>
                            </div>
                        </div>
                    </section> : 
                    <div className="d-flex info-patient col mt-2 ms-2 m-2 rounded-4">
                        <div className="h-100 w-100 d-flex align-items-center">
                            <p className="w-100 text-center text-secondary">Selecciona un paciente</p>
                        </div>
                    </div>

                               
                }
            </div>
        </main>
    )
}