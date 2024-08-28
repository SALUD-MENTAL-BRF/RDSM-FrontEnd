import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import '../../assets/style/header/header.css'

export const Lougout = () => {

  const { logout } = useAuth()

  const handleLogout = ()=>{
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez cerrada la sesión no podrás acceder a tu cuenta",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        Swal.fire(
          "Cerrado",
          "Tu sesión ha sido cerrada",
          "success"
        );
      }
    });
  }

  return(
    <button onClick={handleLogout} className="Header__buttons-Logout">Cerrar Sesión </button>
  )
}