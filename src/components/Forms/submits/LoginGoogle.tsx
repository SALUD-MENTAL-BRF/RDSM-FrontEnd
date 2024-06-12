import { useContext, useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { AuthContext } from "../../../context/AuthProvider";

function LoginGoogle() {

  const { login }: any = useContext(AuthContext);
  const CLIENT_ID = "136089606734-e5goqplme4c83uluaqgtilb6r4mubnj7.apps.googleusercontent.com";

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: CLIENT_ID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (response:any) => {
    try {
      const tokenId = response.tokenId;  // Obtener el tokenId
      
      // Enviar el tokenId al servidor
      axios
        .post("http://localhost:3000/auth/google", { tokenId })
        .then((response) => {
          login({ token: response.data.token, user: response.data.user });
          setTimeout(() => {
            window.location.href = "http://localhost:4000/home  ";
          });
        })
        .catch((error) => {
          console.error("Error al autenticar el usuario:", error.response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onFailure = (err:any) => {
    console.log("Error", err);
  };

  return (
    <div className="center">
      <div className="btn">
        <GoogleLogin
          clientId={CLIENT_ID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_policy"}
          redirectUri="http://localhost:4000/auth/google/callback"
        />
      </div>
    </div>
  );
}

export default LoginGoogle;
