import axios from "axios";

class AuthService{
    login(username, password) {
        console.log('url:' + process.env.REACT_APP_API_BASE_URL);
        return axios
          .post(process.env.REACT_APP_API_BASE_URL + "/oauth/token", { username, password })
          .then((response) => {
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
    
            return response.data;
          })
          .catch((error)=>{
              console.log(error);
              console.log('a');
              throw error;
          });
      }
}

export default new AuthService();