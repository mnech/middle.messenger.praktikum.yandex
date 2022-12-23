import { ProfileAPI } from "../api/ProfileAPI";
import { ProfileData, PasswordData } from "../types/interfaces";
import Store from "../utils/Store";

interface error {
  reason: string;
}

class ProfileController {
  constructor(private api: ProfileAPI) {};

  private async request(path: string, req: () => void) {
    try {
      this.setError(null, path);
      await req();
    } catch(e: unknown) {
      this.setError(e as error, path); 
    } 
  }

  private setError(e: error | null, path: string) {
    if (e) {
      Store.set(path, e.reason);
    } else {
      Store.set(path, e);
    }
    
  }

  async changeProfile(profileData: ProfileData) {
    await this.request("user.data", async() => {
      const data = await this.api.changeProfile(profileData);
      Store.set("user.data", data);
    });
  }

  async changeAvatar(avatarData: FormData) {
    await this.request("userError", async() => {
      await this.api.changeAvatar(avatarData);
    })
  }
  
  async changePassword(passwordData: PasswordData) {
    await this.request("userError", async() => {
      await this.api.changePassword(passwordData);
    })
  }

  async searchByLogin(login: String) {
    await this.request("addUserToChat", async() => {
      const res = await this.api.searchByLogin(login);
      Store.set("friend", res);

      if (!res.length) {
        Store.set("addUserToChat", "User not found");
      }
    });
  }
}
export default new ProfileController(new ProfileAPI());
