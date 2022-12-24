import { ProfileAPI } from "../api/ProfileAPI";
import { ProfileData, PasswordData } from "../types/interfaces";
import Store from "../utils/Store";
import { request } from "../utils/helpers";

class ProfileController {
  constructor(private api: ProfileAPI) {};

  async changeProfile(profileData: ProfileData) {
    await request("userError", async() => {
      const data = await this.api.changeProfile(profileData);
      Store.set("user.data", data);
    });
  }

  async changeAvatar(avatarData: FormData) {
    await request("userError", async() => {
      await this.api.changeAvatar(avatarData);
    })
  }
  
  async changePassword(passwordData: PasswordData) {
    await request("userError", async() => {
      await this.api.changePassword(passwordData);
    })
  }

  async searchByLogin(login: String) {
    await request("addUserToChat", async() => {
      const res = await this.api.searchByLogin(login);
      Store.set("friend", res);

      if (!res.length) {
        Store.set("addUserToChat", "User not found");
      }
    });
  }
}
export default new ProfileController(new ProfileAPI());
