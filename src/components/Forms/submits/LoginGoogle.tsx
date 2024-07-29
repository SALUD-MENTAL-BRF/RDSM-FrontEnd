import { useEffect } from "react";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { CustomFetch } from "../../../api/CustomFetch";
import useAuth from "../../../hooks/useAuth";

function LoginGoogle() {
  const { login } = useAuth();
  const CLIENT_ID = "136089606734-e5goqplme4c83uluaqgtilb6r4mubnj7.apps.googleusercontent.com";

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: CLIENT_ID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = async (response: any) => {
    try {
      const tokenId = response.tokenId;
      
      const data = await CustomFetch("http://localhost:3000/auth/google", 'POST', { tokenId });

      if (data && data.user && data.token) {
        login(data.user, data.token);
      } else {
        console.error("Error: Datos de usuario o token no recibidos correctamente.");
        }
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
