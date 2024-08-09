import { Header } from "../components/headers/Header";
import { Aside } from "../components/aside/Aside";
import '../assets/style/Consultation.css'
import { useNavigate } from "react-router-dom";


export const ConsultationPage = () => {

    const navigate = useNavigate()

    return (
        <>
            <Header />
            <main className="container-fluid container-consultation">
                <div className="row w-100">
                    <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center aside-color">
                        <Aside />
                    </section>
                    <section className="col-10 col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-11">
                        <div className="row justify-content-center">
                            <h2 className="text-center mt-1 title-consultas">Consultas:</h2>
                            <div className="text-lista-consultas">
                                <ul className="d-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right mt-1" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                    </svg>
                                    <div>
                                        <h5 className="ms-3">Reporte:</h5>
                                        <p className="ms-4 mt-1">Si tienes algún problema con la aplicación, como errores técnicos, problemas de acceso, o cualquier otra dificultad, puedes completar el formulario describiendo el problema detalladamente. Nuestro equipo de soporte revisará tu caso y te ofrecerá una solución lo antes posible.</p>
                                    </div>
                                </ul>
                                <ul className="d-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right mt-1" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                                    </svg>
                                    <div>
                                        <h5 className="ms-3">Profesionales:</h5>
                                        <p className="ms-4 mt-1">Si eres un profesional de la salud mental y te gustaría formar parte de nuestra aplicación, puedes rellenar nuestro formulario para profesionales. Una vez completado, nuestro equipo revisará tu solicitud y te responderemos lo más rápido posible para darte más información sobre cómo unirte a nuestro equipo y empezar a colaborar con nosotros.</p>
                                    </div>
                                </ul>
                            </div>
                            <div className="row mt-5">
                                <div className="col-sm-6">
                                    <button className="btn btn-outline-danger w-100">Reporte</button>
                                </div>
                                <div className="col">
                                    <button onClick={() => navigate("/form-professional")} className="btn btn-outline-success w-100">Profesionales</button>
                                </div>
                            </div>
                            
                           
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};
