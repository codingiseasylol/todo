async function httpRequest(method, url, payload) {
    try {
        let configuration = {
            method: method,
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
        };

        if (["POST", "PATCH"].includes(method)) {
            configuration.body = JSON.stringify(payload);
        }

        let response = await fetch(url, configuration);

        if (response.ok) {
            let result = await response.json();
            return result;
        } else if (response.status === 401) {
            page("login");
            return null;
        } else {
            let errorData = await response.json();
            throw new Error(`Error ${response.status}: ${errorData.message || response.statusText}`);
        }
    } catch (err) {
        console.error("Request failed", err);
        return { error: err.message };
    }
}

export async function fetchGet(url) {
    return httpRequest("GET", url);
}

export async function fetchPost(url, payload) {
    return httpRequest("POST", url, payload);
}

export async function fetchPatch(url, payload) {
    return httpRequest("PATCH", url, payload);
}

export async function fetchDelete(url) {
    return httpRequest("DELETE", url);
}
