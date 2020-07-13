const baseURL = 'http://localhost:8080';

async function getUser() {
    return fetch(`${baseURL}/api/user`, { credentials: 'include' }).then(response => response.text());
}

async function logout(csrfToken) {
    return fetch(`${baseURL}/api/logout`, {
        method: 'POST',
        headers: { 'X-XSRF-TOKEN': csrfToken },
        credentials: 'include'
    })
        .then(res => res.json()).then(response => {
            window.location.href = response.logoutUrl + "?id_token_hint=" +
                response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
        })
}

async function loadGroups() {
    return fetch(`${baseURL}/api/groups`, { credentials: 'include' })
        .then(response => response.json());
}

async function loadGroup(id) {
    return fetch(`${baseURL}/api/group/${id}`, {
        credentials: 'include'
    }).then(response => response.json);
}

async function removeGroup(csrfToken, id) {
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

async function editGroup(csrfToken, item) {
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

export { getUser, logout, loadGroups, loadGroup, removeGroup, editGroup }