import axios from 'axios';

const configXFrom = {
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

const userRequest = axios.create(configXFrom);

export const apiUserLogin = data => userRequest.post("/oauth/token", data);
