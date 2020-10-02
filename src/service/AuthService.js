import {
  apiUserLogin,
  apiUserCheck,
  apiSignUp
} from "../util/APIUtils";
const querystring = require('querystring');

class AuthService {
  login(loginRequest) {
    const { username, password } = loginRequest;

    let data = querystring.stringify({
      'grant_type': 'password',
      'username': username,
      'password': password,
      'scope': 'all'
    });

    return apiUserLogin(data)
      .then((response) => {
        const payload = response.data;
        if (payload.access_token) {
          localStorage.setItem("user", JSON.stringify(payload));
        }

        return payload;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  logOut() {
    localStorage.removeItem("user");
  }

  async check(checkRequest) {
    const { token } = checkRequest;

    let data = querystring.stringify({
      token: token
    });

    return await apiUserCheck(data)
      .then((response) => {
        const payload = response.data;
        if (!payload.active) {
          throw "Invalid token.";
        }

        return payload;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  signUp(signupRequest) {
    const { name, email, password } = signupRequest;

    let data = {
      'name': name,
      'email': email,
      'password': password,
    };

    return apiSignUp(data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}

export default new AuthService();