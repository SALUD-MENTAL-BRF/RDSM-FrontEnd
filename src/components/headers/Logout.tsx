import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";


export const Lougout = () => {

  const { logout } = useContext(AuthContext)

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
    <button onClick={handleLogout} className="btn Header__buttons-login">Cerrar Sesión </button>
  )
}