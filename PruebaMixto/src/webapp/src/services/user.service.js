import handleResponse from "./response.service";

export function getUser() {
    return fetch("/api/user", {credentials: 'include'})
        .then(handleResponse);
}

export function signUp(csrfToken, data) {
    return fetch("/api/user/", {
        method: 'POST',
        headers: {
            'X-XSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(handleResponse);
}