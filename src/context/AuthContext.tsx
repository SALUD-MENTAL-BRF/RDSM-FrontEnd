import { createContext, ReactNode, FC } from 'react';
import { AuthContextProps, User } from './types/types';
import { types } from '../types/typesUser';
import { authReducer } from '../reducers/authReducers';
import { useReducer } from 'react';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const [authState, dispatch] = useReducer(authReducer,{
      isLogged: (localStorage.getItem('isLogged') == 'true') ? true : false
  })

  const login = async (user: User, token: string) => {
    const payload = {
      user,token
    }
    dispatch({
        type: types.LOGIN,
        payload
    })
}

const logout = () => {
    dispatch({
        type: types.LOGOUT
    })
}

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
