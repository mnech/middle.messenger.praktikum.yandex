import BaseAPI from "./BaseAPI";
import { ProfileData, AvatarData, PasswordData, User } from "../types/interfaces";


export class ProfileAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  public changeProfile(profileData: ProfileData) {
    return this.hhtp.put("/profile", {data: profileData});
  }

  public changeAvatar(avatarData: AvatarData) {
    return this.hhtp.put("/profile/avatar", {data: avatarData});
  }

  public changePassword(passwordData: PasswordData) {
    return this.hhtp.put("/password", {data: passwordData});
  }

  public read(): Promise<User> {
    return this.hhtp.get("/{id}");
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}
