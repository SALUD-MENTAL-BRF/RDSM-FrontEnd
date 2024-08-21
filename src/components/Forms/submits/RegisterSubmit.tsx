import { CustomFetch } from '../../../api/CustomFetch';
import Swal from "sweetalert2";
import useAuth from '../../../hooks/useAuth';

interface FormState {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegisterSubmit: React.FC<{ stateForm: FormState }> = ({ stateForm }) => {


    const { login } = useAuth()

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        if (stateForm.password !== stateForm.confirmPassword) {
            return Swal.fire({
                title: "Error",
                text: "Las contraseñas no coinciden",
                icon: "error",
                width: "50%",
                padding: "1rem",
                background: "#FFF",
                grow: "row",
            });
        } else {
            try {
                const data = await CustomFetch(`${import.meta.env.VITE_API_URL}auth/register`, "POST", {
                    username: stateForm.username,
                    email: stateForm.email,
                    password: stateForm.password,
                });

                login(data.token);
                Swal.fire({
                    title: "Éxito",
                    text: "Usuario registrado correctamente",
                    icon: "success",
                    width: "50%",
                    padding: "1rem",
                    background: "#FFF",
                    grow: "row",
                });

            } catch (error) {
                console.error("Error al registrar el usuario:", error);
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al registrar el usuario",
                    icon: "error",
                    width: "50%",
                    padding: "1rem",
                    background: "#FFF",
                    grow: "row",
                });
            }
        }
    };

    return (
        <div className="botonRegister">
            <button type="submit" onClick={handleSubmit} className="botonRegister">
                Registro
            </button>
        </div>
    );
};
