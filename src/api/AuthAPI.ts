import BaseAPI from "./BaseAPI";
import { SigninData, SignupData, User } from "../types/interfaces";


export class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  public signin(signinData: SigninData) {
    return this.hhtp.post("/signin", {data: signinData});
  }

  public signup(signupData: SignupData) {
    return this.hhtp.post("/signup", {data: signupData});
  }

  public read(): Promise<User> {
    return this.hhtp.get("/user");
  }

  public logout() {
    return this.hhtp.post("/logout");
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}
