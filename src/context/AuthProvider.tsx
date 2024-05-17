import { createContext, useReducer, ReactNode } from "react";
import { authReducer } from "../reducer/authReducer";
import { actiontypes } from '../types/types';
import { AuthState, AuthContextType } from '../types/auth';

interface AuthProviderProps {
    children: ReactNode;
}

const initialAuthState: AuthState = {
    islogged: localStorage.getItem('islogged') === 'true',
    admin: localStorage.getItem('admin') === 'true',
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [authState, dispatch] = useReducer(authReducer, initialAuthState);

    const login = async (payload: { token: { token: string }; user: { admin: boolean } }) => {
        dispatch({
            type: actiontypes.LOGIN,
            payload
        });
    };

    const logout = () => {
        dispatch({
            type: actiontypes.LOGOUT
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
