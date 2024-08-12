import { types } from "../types/typesUser";


export const authReducer = (state = {}, action:any) => {

    switch (action.type) {
        case types.LOGIN:
            const { token, user } = action.payload
            localStorage.setItem('token', token);
            // localStorage.setItem('admin', user.admin);
            localStorage.setItem('isLogged', "true");
            return {
                ...action.payload,
                isLogged: true,
                // admin: user.admin,
            };

        case types.LOGOUT:
            localStorage.clear()
            return {
                isLogged: false,
                // admin: false
            }

        default:
            return state;
    }

};