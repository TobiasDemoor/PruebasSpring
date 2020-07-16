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
        body: JSON.stringify({
            _csrf: csrfToken
        }),
        credentials: 'include'
    }).then(handleResponse);
}

export function login(csrfToken, data) {
    return fetch(`${baseURL}/api/login`, {
        method: 'POST',
        headers: {
            'X-XSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...data,
            _csrf: csrfToken
        }),
    }).then(handleResponse);
}