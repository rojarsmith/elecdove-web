import {
  apiUserCheck
} from "../util/APIUtils";
const querystring = require('querystring');

class AccountService {
  getAccount(data) {
    let user = JSON.parse(localStorage.getItem('user'));

    let payload = querystring.stringify({
      token: user.access_token,
    });

    return apiUserCheck(payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}

export default new AccountService();