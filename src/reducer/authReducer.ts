// src/reducer/authReducer.ts
import { actiontypes, Types } from '../types/types';
import { AuthState } from '../types/auth';

interface Action {
    type: Types;
    payload?: {
        token: {
            token: string;
        };
        user: {
            admin: boolean;
        };
    };
}

export const authReducer = (state: AuthState = { islogged: false, admin: false }, action: Action): AuthState => {
    switch (action.type) {
        case actiontypes.LOGIN:
            if (action.payload) {
                const { token, user } = action.payload;
                localStorage.setItem('token', token.token);
                localStorage.setItem('islogged', 'true');
                return {
                    ...state,
                    token: token.token,
                    islogged: true,
                    admin: user.admin,
                };
            }
            return state;
        case actiontypes.LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('islogged');
            return {
                ...state,
                token: undefined,
                islogged: false,
                admin: false,
            };
        default:
            return state;
    }
}
