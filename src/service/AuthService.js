import {
  apiUserLogin,
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

  signUp(signupRequest) {
    const { name, email, password } = signupRequest;

    let data = {
      'name': name,
      'email': email,
      'password': password,
    };

    console.log(data);

    return apiSignUp(data)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}

export default new AuthService();