import { apiUserLogin } from "../util/APIUtils";
const querystring = require('querystring');

class AuthService {
  async login(username, password) {
    let data = querystring.stringify({
      'grant_type': 'password',
      'username': username,
      'password': password,
      'scope': 'all'
    });

    return apiUserLogin(data)
      .then((response) => {
        const payload = response.data;
        if (payload.accessToken) {
          localStorage.setItem("user", JSON.stringify(payload));
        }

        return payload;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}

export default new AuthService();