function handleResponse(response) {
    console.log(response);
    return response.text().then((text) => {
        console.log(text);
        // TODO: ver si sigue siendo necesario
        let data;
        if (text) {
            try {
                data = JSON.parse(text);
            } catch (e) {
                data = text;
                console.error(e);
            }
        }
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // usuariosService.logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export default handleResponse;