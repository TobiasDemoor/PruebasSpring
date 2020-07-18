import * as userServices from '../../services/user.service';
import getCookie from "../../helpers/getCookie";

export const actionTypes = {
    userRequest: 'USER_REQUEST',
    userSuccess: 'USER_SUCCESS',
    userError: 'USER_ERROR',

    signUpRequest: 'SIGN_UP_REQUEST',
    signUpSuccess: 'SIGN_UP_SUCCESS',
    signUpError: 'SIGN_UP_ERROR'
};

export function getUser() {
    return function (dispatch) {
        dispatch({type: actionTypes.userRequest})
        userServices.getUser()
            .then(
                response => dispatch({
                    type: actionTypes.userSuccess,
                    payload: {
                        csrfToken: getCookie('XSRF-TOKEN') || "placeholder",
                        user: response
                    }
                }))
            .catch(
                error => dispatch({
                    type: actionTypes.userError,
                    payload: {
                        csrfToken: getCookie('XSRF-TOKEN') || "placeholder"
                    },
                    error: error.message || error
                })
            );
    }
}

export function signUp(data) {
    return function (dispatch, getState) {
        const {name, ...rest} = data;
        dispatch({type: actionTypes.signUpRequest});
        userServices.signUp(getState().user.csrfToken, {...rest, publicUser: {name}})
            .then(
                response => dispatch({
                    type: actionTypes.signUpSuccess,
                    payload: {user: response}
                })
            )
            .catch(
                error => dispatch({
                    type: actionTypes.signUpError,
                    error: error.message || error
                })
            );
    }

}
