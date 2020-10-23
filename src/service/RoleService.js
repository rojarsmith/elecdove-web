import {
  apiRoleMultiAll
} from "../util/APIUtils";

class RoleService {
  roleMultiAll() {
    return apiRoleMultiAll()
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
}

export default new RoleService();