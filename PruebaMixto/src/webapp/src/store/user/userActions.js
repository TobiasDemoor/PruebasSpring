import * as userServices from '../../services/user.service';
import getCookie from "../../helpers/getCookie";

export const actionTypes = {
    userRequest: 'USER_REQUEST',
    userSuccess: 'USER_SUCCESS',
    userError: 'USER_ERROR'
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
                    error: error.message
                })
            );
    }

}

export function login() {

}

export function logout() {

}
