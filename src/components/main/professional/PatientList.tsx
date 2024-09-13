import React from "react";
import { patient } from "../../../types/patients.dto";

interface Props {
    fullscreenState: boolean;
    changeFulscree: () => void;
    patientState: Array<patient>;
    updateInfoPatient: (patient: patient) => void;
}

export const PatientList: React.FC<Props> = ({changeFulscree,fullscreenState, patientState, updateInfoPatient}) => {
    return(
        <>
            {
                fullscreenState == true ?
                <section className="patient-assigned col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 mt-4 rounded-4 ms-2 m-2">
                    <div className="row">
                        <div className="d-flex align-items-center w-100">
                            <h4 className="w-100 text-center fw-bold mt-2">Lista de pacientes</h4>
                            <div onClick={changeFulscree} title="Minimizar">
                                <svg   role="button" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                                    <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5m5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5M0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5m10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0z"/>
                                </svg>
                            </div>
                        </div>
                        {

                            patientState.map((patient) => (
                                <div key={patient.id} className="container-imgPatient d-flex" onClick={() => updateInfoPatient(patient)}>
                                    <div role="button">
                                    <img src={patient.user.imageUrl.length > 1 ?
                                            patient.user.imageUrl :
                                            "/image-example/imageUser.jpg"
                                    } alt="" className="imgPatient rounded-5"/>
                                        {/* <img className="imgPatient rounded-5" src="/image-example/imageUser.jpg" alt="" /> */}
                                    </div>
                                    <p role="button" className="mt-3 ms-3">{patient.fullname}</p>
                                </div>
                            ))

                        }
                        
                    </div>
                </section>
                : 
                <section className="patient-assigned-exit col-2 rounded-4 ms-2 m-2 mt-4">
                    <div className="row">
                        <div className="d-flex align-items-center w-100">
                            <h4 className="w-100 text-center fw-bold mt-4">Lista de pacientes</h4>
                            <div className="mt-3 ms-2" onClick={changeFulscree} title="Maximizar">
                                <svg role="button" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}