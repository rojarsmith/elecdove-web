import {
    API_BASE_URL,
    ACCESS_TOKEN,
    OAUTH_AUTHORIZATION
} from '../variables/constants';

const request = (options) => {
    if (options.type === 'oauth') {
        const headers = new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': OAUTH_AUTHORIZATION
        })

        let person = {
            'username': options.data.username,
            'password': options.data.password,
            'scope': 'all',
            'grant_type': 'password'
        };

        let formBody = [];
        for (let property in person) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(person[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const defaults = {
            headers: headers,
            body: formBody
        };

        options = Object.assign({}, defaults, options);

        return fetch(options.url, options)
            .then(response =>
                response.json().then(json => {
                    if (!response.ok) {
                        return Promise.reject(json);
                    }
                    localStorage.setItem(ACCESS_TOKEN, json.access_token);
                    return json;
                }));
    } else {
        const headers = new Headers({
            'Content-Type': 'application/json'
        })

        if (localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
        }

        const defaults = { headers: headers };
        options = Object.assign({}, defaults, options);

        return fetch(options.url, options)
            .then(response =>
                response.json().then(json => {
                    json.status = response.status;

                    if (!response.ok) {
                        return Promise.reject(json);
                    }
                    return json;
                }));
    }
};

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/person",
        method: 'GET'
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    })
}

export function confirmAccount(confirmAccountRequest) {
    return request({
        url: API_BASE_URL + "/auth/confirm-account?token=" + confirmAccountRequest.token,
        method: 'GET'
    })
}

export function login(loginRequest) {
    return request({
        type: 'oauth',
        url: API_BASE_URL + '/oauth/token',
        method: 'POST',
        data: loginRequest
    })
}