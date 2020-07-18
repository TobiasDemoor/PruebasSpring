import handleResponse from "./response.service";

export function loadGroups() {
    return fetch("/api/groups", {credentials: 'include'})
        .then(handleResponse);
}

export function loadGroup(id) {
    return fetch(`/api/groups/${id}`, {
        credentials: 'include'
    }).then(handleResponse);
}

export function removeGroup(csrfToken, id) {
    return fetch(`/api/groups/${id}`, {
        method: 'DELETE',
        headers: {
            'X-XSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(handleResponse);
}

export function editGroup(csrfToken, item) {
    return fetch(
        "/api/groups/" + (item.id? item.id + '/':''),
        {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'X-XSRF-TOKEN': csrfToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
            credentials: 'include'
        }).then(handleResponse);
}
