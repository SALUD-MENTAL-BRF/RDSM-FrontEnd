import { createContext, ReactNode, FC } from 'react';
import { AuthContextProps, AuthState } from './types/types';
import { types } from '../types/typesUser';
import { authReducer } from '../reducers/authReducers';
import { useReducer } from 'react';

// Inicializamos el AuthContext
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Inicialización del authState desde el localStorage
  const [authState, dispatch] = useReducer(authReducer, {
    isLogged: localStorage.getItem('isLogged') === 'true',
    token: localStorage.getItem('token') || null
  } as AuthState);

  // Función de login que guarda el token y actualiza el estado
  const login = async (token: string) => {
    dispatch({
      type: types.LOGIN,
      payload: { token }
    });
  };

  // Función de logout que limpia el estado y el localStorage
  const logout = () => {
    dispatch({
      type: types.LOGOUT
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };