import axios from 'axios';

const configNormalGet = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
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

const normalGetRequest = axios.create(configNormalGet);
const xformRequest = axios.create(configXForm);
const jsonRequest = axios.create(configJson);

export const apiUserLogin = data => xformRequest.post("/oauth/token", data);
export const apiUserCheck = data => xformRequest.post("/oauth/check_token", data);
export const apiUserSignUp = data => jsonRequest.post("/auth/signup", data);
export const apiUserConfirmMail = token => normalGetRequest.get("/auth/confirm-account/" + token);
export const apiUserAskResetPassword = email => jsonRequest.post("/auth/ask-reset-password", { email: email });
export const apiUserResetPassword = data => jsonRequest.post("/auth/reset-password", data);

// export const apiGetAccount = data => xformRequest.post("/oauth/check_token", data);

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
