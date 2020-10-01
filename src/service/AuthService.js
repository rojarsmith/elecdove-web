import axios from "axios";
const querystring = require('querystring');

class AuthService {
  login(username, password) {
    console.log(process.env.REACT_APP_API_BAUTH_PASSWORD)
    const config = {
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

    let data = querystring.stringify({
      'grant_type': 'password',
      'username': username,
      'password': password,
      'scope': 'all'
    });

    return axios
      .post(process.env.REACT_APP_API_BASE_URL + "/oauth/token",
        data,
        config)
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}

export default new AuthService();