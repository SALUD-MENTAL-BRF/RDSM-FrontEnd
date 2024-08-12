import { useNavigate } from "react-router-dom"
import '../../assets/style/profile/profileProfessional.css'

export const ProfileProfessional = () => {

    const navigate = useNavigate()


    return(
        <main className='container-fluid container-profileProfessional'>
        <div className="row w-100">
            <section className="col-2 col-sm-2 col-md-2 col-lg-1 col-xl-1 col-xxl-1 text-center">
                <div role='button' onClick={() => navigate('/professionals')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-arrow-bar-left mt-4" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
                    </svg>
                    <h6 className='ms-1'>Volver</h6>
                </div>
            </section>
            <section className="col-10 col-sm-10 col-md-10 col-lg-11 col-xl-11 col-xxl-11">
                <div className="row justify-content-center mt-5">
                    <div className="col text-end">
                        <img src="" alt="" className="image-profileProfessional"/>
                    </div>
                    <div className="col mt-2">
                        <p>Nombre/s</p>
                        <p>Apellido</p>
                        <p>Título</p>
                        <p>Especialización</p>
                    </div>
                </div>
            </section>
        </div>
    </main>
    )
}