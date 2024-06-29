import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthProvider";
interface FormState {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegisterSubmit: React.FC<{ stateForm: FormState }> = ({ stateForm }) => {
    const { login }: any = useContext(AuthContext);

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
            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: stateForm.username,
                    email: stateForm.email,
                    password: stateForm.password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                login({ token: data.token, user: data.user });

                Swal.fire({
                    title: "Éxito",
                    text: "Usuario registrado correctamente",
                    icon: "success",
                    width: "50%",
                    padding: "1rem",
                    background: "#FFF",
                    grow: "row",
                });

                setTimeout(() => {
                    window.location.href = "/"
                }, 2000);

            } else {
                const data = await response.json();
                return Swal.fire({
                    title: "Error",
                    text: data.message,
                    icon: "error",
                    width: "50%",
                    padding: "1rem",
                    background: "#FFF",
                    grow: "row",
                });
            }

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
