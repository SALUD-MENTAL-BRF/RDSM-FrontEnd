import React,{useEffect, useState} from 'react';
import '../../assets/style/HomePatient/PanelPatient.css'
import { useNavigate } from 'react-router-dom';
import { CustomFetch } from '../../api/CustomFetch';
import { User } from '../../types/user.dto';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  link: string;
  roleId?: number
}



const Feature: React.FC<FeatureProps> = ({ icon, title, description, buttonText, link, roleId }) => {
  
  const navigate = useNavigate()  

  const redirect = (link: string) =>{

    if(link == "/activities"){
      if(roleId !== 3){
        return Swal.fire({
          title: "Error",
          text: "Necesitas tener un profesional asignado para acceder a las actividades.",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ok",
        })
      }
    }

    return navigate(link)
  } 
  return(
  <div className="col-md-12 col-lg-4 mb-4">
    <div className="d-flex flex-column align-items-center text-center h-100">
      <div className="mb-3 text-emerald-500">{icon}</div>
      <h2 className="h4 fw-bold mb-3">{title}</h2>
      <p className="text-muted small mb-3">{description}</p>
      <button onClick={()=>redirect(link)} className="btn btn-outline-primary mt-auto">{buttonText}</button>
    </div>
  </div>
  )
};

const IconMessageCircle: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
  </svg>
);

const IconCalendar: React.FC = () => (
  <img src="./icons/charla.png" alt="icono de la comunidad" />
);

const IconBook: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconSettings: React.FC = () => (
  <img src="./icons/notas.png" alt="icono de notas" />
);

const IconDice: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-dice-6-fill" viewBox="0 0 16 16">
    <path d="M3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3zm1 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m1.5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M12 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3M5.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M4 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
  </svg>
)

const IconPerson: React.FC = () => {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
  </svg>
  )
}

const IconList: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
      <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
      <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
    </svg>
  )
}

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const {authState} = useAuth()
  const [userState, setUserState] = useState<User>()

  useEffect(() => {
    (
      async () => {
        const data = await CustomFetch(`${import.meta.env.VITE_API_URL}users/token/${authState.token}`, 'GET')
        setUserState(data)
      }
    )()
  },[])



  return (
 

      <main className="flex-grow-1">
          <section className="py-5 bg-emerald-50">
            <div className="container px-4 px-md-5">
              <div className="text-center">
                <h1 className="display-5 fw-bold mb-3"> 
                  Bienvenido a tu espacio de bienestar
                </h1>
                <p className="lead text-muted mb-4 mx-auto" style={{ maxWidth: '700px' }}>
                  Aquí puedes acceder a tus sesiones, recursos y herramientas para cuidar tu salud mental.
                </p>
                <form className="d-flex justify-content-center">
                  <input
                    className="form-control me-2"
                    style={{ maxWidth: '300px' }}
                    placeholder="Buscar recursos o profesionales"
                    type="text"
                  />
                  <button className="btn btn-primary" type="submit">Buscar</button>
                  <button onClick={() => navigate('/professionals')} className="ms-1 btn btn-primary" type="submit">Ver lista</button>
                </form>
              </div>
            </div>
          </section>
          <section className="py-5">
            <div className="container px-4 px-md-5">
              <div className="row">
                <Feature
                  icon={<IconMessageCircle />}
                  title="Consultas en Línea"
                  description={`Accede a tus sesiones programadas con ${userState?.roleId == 2 ? "los pacientes" : "profesionales"}.`}
                  buttonText="Ver Consultas"
                  link='#'
                />
                <Feature
                  icon={<IconCalendar />}
                  title="Comunidad"
                  description="Intercambia pensamientos en esta comunidad."
                  buttonText="Ir a la comunidad"
                  link='#'
                />
                <Feature
                  icon={<IconBook />}
                  title="Recursos"
                  description="Explora material educativo."
                  buttonText="Ver Recursos"
                  link='/information'
                />
                
                {
                  userState?.roleId != 2  ?
                  <Feature
                  icon={<IconSettings />}
                  title="Diario Personal"
                  description="Este es tu espacio seguro."
                  buttonText="Escribir"
                  link='/personalDiary'
                />
                :""
                }
                {
                  userState?.roleId != 2  ?
                  <Feature
                  icon={<IconDice/>}
                  title='Actividades'
                  description='Prueba los distintos ejercicios.'
                  buttonText='Ver actividades'
                  link='/activities'
                  roleId={userState?.roleId}
                />: ""
                }
                {
                userState?.roleId == 2 ? 
                <Feature
                  icon={<IconPerson/>}
                  title='Pacientes'
                  description='Gestiona las actividades y el progreso de tus pacientes.'
                  buttonText='Ver pacientes'
                  link='/patient'
                />
                :  ""
                } 
                {
                  userState?.roleId == 2 ? 
                  <Feature
                    icon={<IconList/>}
                    title='Solicitudes'
                    description='Gestiona las solicitudes de los usuarios que requieren de tu atención.'
                    buttonText='Ver solicitudes'
                    link='/request-list'
                  />
                  :  ""
                }
              </div>
            </div>
          </section>
        </main>
  );
}