import {
  apiUserCheck,
  apiAccountCurrent,
  apiAccountUpdateDetail,
  apiUserAll,
  apiUserSingle,
  apiUserDelete,
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

  async current() {
    return await apiAccountCurrent()
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  updateDetail(data) {
    // Example:
    // let body = {
    //   id: "1",
    //   realName: "update真名",
    //   company: "updateかいしゃ",
    //   job: "updateJOB",
    //   taxcode: "updateTAX",
    //   address: "updateADD",
    //   phone: "updatePHONE"
    // });

    return apiAccountUpdateDetail(data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  async userAll() {
    return await apiUserAll()
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  userSingle(data) {
    return apiUserSingle(data.state.userId)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  async userDelete(data) {
    return await apiUserDelete(data.state)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  // Bugs
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