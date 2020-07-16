import handleResponse from "./response.service";

const baseURL = 'http://localhost:8080';

export function getUser() {
    return fetch(`${baseURL}/api/user`, {credentials: 'include'})
        .then(handleResponse);
}

export function logout(csrfToken) {
    return fetch(`${baseURL}/api/logout`, {
        method: 'POST',
        headers: {'X-XSRF-TOKEN': csrfToken},
        credentials: 'include'
    })
        .then(res => res.json()).then(response => {
            window.location.href = response.logoutUrl + "?id_token_hint=" +
                response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
        })
}

export function login(csrfToken, data) {
    return fetch(`${baseURL}/api/login`, {
        method: 'POST',
        headers: {'X-XSRF-TOKEN': csrfToken},
        body: JSON.stringify({
            ...data,
            _csrf: csrfToken
        }),
    }).then(handleResponse);
}