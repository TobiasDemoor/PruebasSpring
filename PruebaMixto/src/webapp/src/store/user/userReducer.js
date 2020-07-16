import {actionTypes} from "./userActions";

const stateInit = {
    csrfToken: undefined,
    user: undefined,
    error: undefined,
    isLoading: true,
    isAuthenticated: false
};

const {userRequest, userSuccess, userError} = actionTypes;

export default (state = stateInit, {type, payload, error}) => {
    switch (type) {
        case userRequest:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false,
                error: undefined
            };
        case userSuccess:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                csrfToken: payload.csrfToken,
                user: payload.user,
                error: undefined
            };
        case userError:
            // TODO: debug
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                csrfToken: payload.csrfToken,
                user: undefined,
                error
            };
            // return {
            //     ...state,
            //     isLoading: false,
            //     isAuthenticated: true,
            //     csrfToken: payload.csrfToken,
            //     user: {name: 'Prueba'},
            //     error: undefined
            // };
        default:
            return state;
    }
}