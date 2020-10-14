import {
  apiUserCheck
} from "../util/APIUtils";
const querystring = require('querystring');

class AccountService {
  getAccount(req) {
    const { token } = req;

    let data = querystring.stringify({
      token: token,
    });

    return apiUserCheck(data)
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