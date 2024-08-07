import { Header } from "../components/headers/Header";
// import { FormConsultation } from "../components/Forms/FormConsultation";
import { Aside } from "../components/aside/Aside";
import '../assets/style/formularios/Consultation.css'
import { useNavigate } from "react-router-dom";


export const ConsultationPage = () => {

    const navigate = useNavigate()

    return (
        <>
            <Header/>
            <main className="container-fluid container-consultation">
                <div className="row w-100">
                    <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center aside-color">
                        <Aside/>
                    </section>
                    <section className="col-10 col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-11">
                        <div className="row justify-content-center">
                            <h2 className="text-center mt-1 title-consultas">Consultas:</h2>
                                <div className="text-lista-consultas">
                                    <ul className="d-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right mt-1" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                                        </svg>
                                        <div>
                                            <h5 className="ms-3">Problemas:</h5>
                                            <p className="ms-4 mt-1">Si tienes algun problema con la aplicación puedes completar el formulario describiendo el mismo.</p>
                                        </div>
                                        
                                    </ul>
                                    <ul className="d-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right mt-1" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                                        </svg>
                                        <div>
                                            <h5 className="ms-3">Profesionales:</h5>
                                            <p>Si quieres formar parte de esta aplicación como un profesional de la salud mental rellena nuestro formulario y te responderemos lo mas rapido posible.</p>
                                        </div>
                                    </ul>
                                </div>
                            <button className="btn btn-outline-danger w-50">Problemas</button>
                            <button onClick={() => navigate("/form-professional")}  className="btn btn-outline-success w-50">Profesionales</button>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};