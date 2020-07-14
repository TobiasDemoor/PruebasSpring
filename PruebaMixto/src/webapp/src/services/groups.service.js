import handleResponse from "./response.service";

const baseURL = 'http://localhost:8080';

function loadGroups() {
    return fetch(`${baseURL}/api/groups`, {credentials: 'include'})
        .then(handleResponse);
}

function loadGroup(id) {
    return fetch(`${baseURL}/api/group/${id}`, {
        credentials: 'include'
    }).then(handleResponse);
}

function removeGroup(csrfToken, id) {
    return fetch(`${baseURL}/api/group/${id}`, {
        method: 'DELETE',
        headers: {
            'X-XSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

function editGroup(csrfToken, item) {
    return fetch(`${baseURL}/api/group` + (item.id ? '/' + item.id : ''), {
        method: (item.id) ? 'PUT' : 'POST',
        headers: {
            'X-XSRF-TOKEN': csrfToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
        credentials: 'include'
    });
}

export {loadGroups, loadGroup, removeGroup, editGroup};