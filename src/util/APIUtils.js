import axios from 'axios';

const configXForm = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    withCredentials: true,
    auth: {
        username: process.env.REACT_APP_API_BAUTH_USERNAME,
        password: process.env.REACT_APP_API_BAUTH_PASSWORD
    },
    validateStatus: function (status) {
        return status >= 200 && status < 300; // default
    },
    xsrfCookieName: 'XSRF-TOKEN', // default
    xsrfHeaderName: 'X-XSRF-TOKEN', // default
};

const configJson = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    auth: {
        username: process.env.REACT_APP_API_BAUTH_USERNAME,
        password: process.env.REACT_APP_API_BAUTH_PASSWORD
    },
    validateStatus: function (status) {
        return status >= 200 && status < 300; // default
    },
    xsrfCookieName: 'XSRF-TOKEN', // default
    xsrfHeaderName: 'X-XSRF-TOKEN', // default
};

const xformRequest = axios.create(configXForm);

const jsonRequest = axios.create(configJson);

export const apiUserLogin = data => xformRequest.post("/oauth/token", data);

export const apiSignUp = data => jsonRequest.post("/auth/signup", data);

export function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    console(user);

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
        // for Node.js Express back-end
        // return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}
