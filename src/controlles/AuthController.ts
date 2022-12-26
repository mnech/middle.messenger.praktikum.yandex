import { AuthAPI } from "../api/AuthAPI";
import { SigninData, SignupData } from "../types/interfaces";
import HTTPTransport from "../utils/HTTPTransport";
import Router from "../utils/Router";
import Store from "../utils/Store";
import { request } from "../utils/helpers";
import MessageController from "./MessageController";

class AuthController {
  constructor(private api: AuthAPI) {};

  async signup(signupData: SignupData) {
    await request("errorAuth", async() => {
      await this.api.signup(signupData);
      await this.fetchUser();
      Router.go("/settings");
    });
  }

  async signin(signinData: SigninData) {
    await request("errorAuth", async() => {
      await this.api.signin(signinData);
      await this.fetchUser();
      Router.go("/messenger");
    });
  }

  async logout() {
    await request("logout", async() => {
      await this.api.logout();

      MessageController.closeAll();

      Router.go("/");
    });
  }

  async fetchUser() {
    await request("fetchUser", async() => {
      const user = await this.api.read();

      Store.set("user.data", user);
    
      if (user.avatar) {
        const photo = `${HTTPTransport.API_URL}/resources${user.avatar}`;
        Store.set("user.data.photo", photo);
      } 
    });
  }
}

export default new AuthController(new AuthAPI());
