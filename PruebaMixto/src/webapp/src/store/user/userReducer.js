import {actionTypes} from "./userActions";

const stateInit = {
    csrfToken: undefined,
    user: undefined,
    error: undefined,
    isLoading: true,
    isAuthenticated: false,
    sgUpError: undefined
};

export default (state = stateInit, {type, payload, error}) => {
    switch (type) {
        case actionTypes.userRequest:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false,
                error: undefined
            };
        case actionTypes.userSuccess:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                csrfToken: payload.csrfToken,
                user: payload.user,
                error: undefined
            };
        case actionTypes.userError:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                csrfToken: payload.csrfToken,
                user: undefined,
                error
            };
        case actionTypes.signUpRequest:
            return {
                ...state,
                isLoading: true,
                user: undefined,
                sgUpError: undefined
            };
        case actionTypes.signUpSuccess:
            return {
                ...state,
                isLoading: false,
                user: payload.user,
                sgUpError: undefined
            }
        case actionTypes.signUpError:
            return {
                ...state,
                isLoading: false,
                sgUpError: error
            }
        default:
            return state;
    }
}
