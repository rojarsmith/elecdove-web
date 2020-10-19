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

const configNormalGetWithToken = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    // withCredentials: true,
    headers: { ...authHeader() },
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

const configJsonWithToken = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    headers: { ...authHeader() },
    validateStatus: function (status) {
        return status >= 200 && status < 300; // default
    },
    xsrfCookieName: 'XSRF-TOKEN', // default
    xsrfHeaderName: 'X-XSRF-TOKEN', // default
};

const normalGetRequest = axios.create(configNormalGet);
var normalGetWithTokenRequest = axios.create(configNormalGetWithToken);
const xformRequest = axios.create(configXForm);
const jsonRequest = axios.create(configJson);
const jsonWithTokenRequest = axios.create(configJsonWithToken);

export const apiUserLogin = data => xformRequest.post("/oauth/token", data);
export const apiUserCheck = data => xformRequest.post("/oauth/check_token", data);
export const apiUserSignUp = data => jsonRequest.post("/auth/signup", data);
export const apiUserConfirmMail = token => normalGetRequest.get("/auth/confirm-account/" + token);
export const apiUserAskResetPassword = email => jsonRequest.post("/auth/ask-reset-password", { email: email });
export const apiUserResetPassword = data => jsonRequest.post("/auth/reset-password", data);

export const apiAccountCurrent = () => {
    configNormalGetWithToken.headers.Authorization = authHeader().Authorization;
    normalGetWithTokenRequest = axios.create(configNormalGetWithToken);
    return normalGetWithTokenRequest.get("/account/current")
};
export const apiAccountDetail = data => normalGetWithTokenRequest.get("/account/detail/" + data);
export const apiAccountUpdateDetail = data => jsonWithTokenRequest.post("/account/update-detail", data);
export const apiUserAll = () => normalGetWithTokenRequest.get("/user/all");

export function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);

    if (user && user.access_token) {
        return { Authorization: 'Bearer ' + user.access_token };
        // for Node.js Express back-end
        // return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}
