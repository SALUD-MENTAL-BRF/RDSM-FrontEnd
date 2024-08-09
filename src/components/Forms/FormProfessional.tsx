import { useNavigate } from 'react-router-dom'
import '../../assets/style/formularios/Professional.css'

export const FormProfessional = () => {

    const navigate = useNavigate()

    return (
        <main className='container-fluid container-formProfessional'>
            <div className="row w-100">
                <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center">
                    <div role='button' onClick={() => navigate('/consultation')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                        </svg>
                        <h6 className='ms-1'>Volver</h6>
                    </div>
                </section>
                <section className="col-10 col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-11 mt-5">
                    <div className="row justify-content-center">
                        <div id="container">
                            <h1>&bull; Solicitud  &bull;</h1>
                            <form className='formProfessional' action="#" method="post" id="contact_form">
                                <div className="row">
                                    <div className="col">
                                        <div className="name">
                                            <label htmlFor="name"></label>
                                            <input type="text" placeholder="Nombre/s" name="name" id="name_input" required />
                                         </div>
                                    </div>
                                    <div className="col">
                                        <div className="formProfessional-Apellido">
                                            <label htmlFor="Apellido"></label>
                                            <input type="text" placeholder="Apellido" name="name" id="name_input" required />
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="formProfessional-email">
                                    <label htmlFor="email"></label>
                                    <input type="email" placeholder="My e-mail is" name="email" id="email_input" required />
                                </div> */}
                                <div className="telephone">
                                    <label htmlFor="name"></label>
                                    <input type="text" placeholder="Télefono" name="telephone" id="telephone_input" required />
                                </div>
                                <div className="subject">
                                    <label htmlFor="subject"></label>
                                    <select aria-placeholder="Subject line" name="subject" id="subject_input" required>
                                        <option disabled hidden selected>Género</option>
                                        <option>Masculino</option>
                                        <option>Femenino</option>
                                        <option>Otro</option>
                                    </select>
                                </div>
                                
                                {/* <div className="formProfessional-message">
                                    <label htmlFor="message"></label>
                                    <textarea name="message" placeholder="I'd like to chat about" id="message_input" cols={30} rows={5} required></textarea>
                                </div> */}
                                    <div className="row">
                                        <div className="col">
                                            <div className="">
                                                <label htmlFor=""></label>
                                                <input type="text" placeholder="Título" name="name" id="name_input" required />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="">
                                                <label htmlFor=""></label>
                                                <input type="text" placeholder="Especialización" name="name" id="name_input" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="d-flex">
                                                <p className='me-2'>MP  N°</p>
                                                <label htmlFor=""></label>
                                                <input className='w-25' type="number" placeholder="" name="name" id="name_input" required />
                                            </div>
                                        </div>
                                        {/* <div className="col">
                                            <div className="">
                                                <label htmlFor=""></label>
                                                <input type="text" placeholder="Especialización" name="name" id="name_input" required />
                                            </div>
                                        </div> */}
                                    </div>
                                <div className="text-center">
                                    <input type="submit" value="Enviar" id="form_button" />
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}