import handleResponse from "./response.service";

export function getUser() {
    return fetch("/api/user", {credentials: 'include'})
        .then(handleResponse);
}
