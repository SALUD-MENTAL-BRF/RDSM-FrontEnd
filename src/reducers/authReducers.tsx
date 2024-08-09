import { types } from "../types/typesUser";


export const authReducer = (state = {}, action:any) => {

    switch (action.type) {
        case types.LOGIN:
            const { token, user } = action.payload
            localStorage.setItem('token', token.token);
            // localStorage.setItem('admin', user.admin);
            localStorage.setItem('isLogged', "true");
            return {
                ...action.payload,
                islogged: true,
                admin: user.admin,
                cinema: user.cinemaId !== null
            };

        case types.LOGOUT:
            localStorage.clear()
            return {
                isLogged: false,
                admin: false
            }

        default:
            return state;
    }

};