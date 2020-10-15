import {
  apiUserCheck,
  apiAccountDetail
} from "../util/APIUtils";
const querystring = require('querystring');

class AccountService {
  getUser(data) {
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

  getAccountDetail(data) {
    let payload = querystring.stringify({
      token: data.access_token,
    });

    return apiAccountDetail(payload)
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