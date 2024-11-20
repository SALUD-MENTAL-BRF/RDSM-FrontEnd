import { createContext, ReactNode, FC, useReducer, useEffect } from 'react';
import { AuthContextProps, AuthState } from './types/types';
import { types } from '../types/typesUser';
import { authReducer } from '../reducers/authReducers';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  const lastLogin = localStorage.getItem("lastLogin");

  const isExpired = tokenExpiration ? Date.now() > Number(tokenExpiration) : true;

  const has7DaysPassed = lastLogin ? (Date.now() - Number(lastLogin)) > (7 * 24 * 60 * 60 * 1000) : true;

  const [authState, dispatch] = useReducer(authReducer, {
    isLogged: localStorage.getItem("isLogged") === 'true' && !isExpired && !has7DaysPassed,
    token: (isExpired || has7DaysPassed) ? null : localStorage.getItem('token') || null
  } as AuthState);

  const login = async (token: string) => {
    const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiration", expirationTime.toString());
    localStorage.setItem("isLogged", "true");
    localStorage.setItem("lastLogin", Date.now().toString());

    dispatch({
      type: types.LOGIN,
      payload: { token }
    });
  };

  const logout = () => {
    dispatch({
      type: types.LOGOUT
    });
  };

  useEffect(() => {
    if (isExpired || has7DaysPassed) {
      logout();
    }
  }, [isExpired, has7DaysPassed]);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
