import { types } from "../types/typesUser";
import { AuthState } from "../context/types/types";

export const authReducer = (state: AuthState, action: any): AuthState => {
  switch (action.type) {
    case types.LOGIN:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("tokenExpiration", (Date.now() + 7 * 24 * 60 * 60 * 1000).toString());
      localStorage.setItem("isLogged", "true");
      localStorage.setItem("lastLogin", Date.now().toString());
      return {
        ...state,
        isLogged: true,
        token: action.payload.token,
      };

    case types.LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem("lastLogin");
      localStorage.setItem("isLogged", "false");
      return {
        isLogged: false,
        token: null,
      };

    default:
      return state;
  }
};
