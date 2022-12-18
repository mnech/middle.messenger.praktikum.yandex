import { ProfileAPI } from "../api/ProfileAPI";
import { ProfileData, AvatarData, PasswordData } from "../types/interfaces";
import Store from "../utils/Store";

class ProfileController {
  constructor(private api: ProfileAPI) {};

  private async request(req: () => void) {
    try {
      Store.set("settings.isSending", true);
      this.setError(undefined);
      await req();
    } catch(e) {
      this.setError(e);
      throw new Error();
    } finally {
      Store.set("user.isSending", false);
    }
  }

  private setError(e: unknown) {
    if (e instanceof Error) {
      Store.set("settings.data", e.message);
    } else if (e){
      Store.set("settings.data", e);
    }
  }

  async changeProfile(profileData: ProfileData) {
    await this.request(async() => {
      const data = await this.api.changeProfile(profileData);
      Store.set("user.data", data);
    });
  }

  async changeAvatar(avatarData: AvatarData) {
    await this.request(async() => {
      await this.api.changeAvatar(avatarData);
    })
  }

  async changePassword(passwordData: PasswordData) {
    await this.request(async() => {
      await this.api.changePassword(passwordData);
    })
  }
}
export default new ProfileController(new ProfileAPI());
