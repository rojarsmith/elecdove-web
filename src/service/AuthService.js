import {
  apiUserLogin,
  apiUserCheck,
  apiUserSignUp,
  apiUserConfirmMail,
  apiUserAskResetPassword,
  apiUserResetPassword,
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
          localStorage.removeItem("user");
          localStorage.setItem("user", JSON.stringify(payload));
        }

        return payload;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  logout() {
    // remove user from local storage to log user out
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
          throw new Error("Invalid token.");
        }

        return payload;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  signup(user) {
    const { username, email, password } = user;

    let data = {
      'name': username,
      'email': email,
      'password': password,
    };

    return apiUserSignUp(data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  confirmMail(token) {
    return apiUserConfirmMail(token)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  askResetPassword(email) {
    return apiUserAskResetPassword(email)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  resetPassword(data) {
    return apiUserResetPassword(data)
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