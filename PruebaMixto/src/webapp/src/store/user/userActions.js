import * as userServices from '../../services/user.service';
import getCookie from "../../helpers/getCookie";

export const actionTypes = {
    userRequest: 'USER_REQUEST',
    userSuccess: 'USER_SUCCESS',
    userError: 'USER_ERROR',

    loginRequest: 'LOGIN_REQUEST',
    loginSuccess: 'LOGIN_SUCCESS',
    loginError: 'LOGIN_ERROR'
};

export function getUser() {
    return function (dispatch) {
        dispatch({type: actionTypes.userRequest})
        userServices.getUser()
            .then(
                response => dispatch({
                    type: actionTypes.userSuccess,
                    payload: {
                        csrfToken: getCookie('XSRF-TOKEN'),
                        user: response
                    }
                }))
            .catch(
                error => dispatch({
                    type: actionTypes.userError,
                    payload: {
                        csrfToken: getCookie('XSRF-TOKEN')
                    },
                    error: error.message
                })
            );
    }

}

export function login(data) {
    return function (dispatch, getState) {
        dispatch({type: actionTypes.loginRequest})
        userServices.login(getState().user.csrfToken, data)
            .then(() => dispatch({
                type: actionTypes.loginSuccess
            }))
            .catch(error => dispatch({
                type: actionTypes.loginError,
                error: error.message
            }));
    }
}
