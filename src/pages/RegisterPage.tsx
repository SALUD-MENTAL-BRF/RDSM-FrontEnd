import { Register } from "../components/Forms/Register"
import useAuth from "../hooks/useAuth"

export const RegisterPage = () => {
  const {isLogged} = useAuth()
  return (
    <Register />
  )
}
