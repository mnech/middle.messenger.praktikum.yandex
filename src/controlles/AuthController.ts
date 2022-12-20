import { AuthAPI } from "../api/AuthAPI";
import { SigninData, SignupData } from "../types/interfaces";
import HTTPTransport from "../utils/HTTPTransport";
import Router from "../utils/Router";
import Store from "../utils/Store";
import MessageController from "./MessageController";

class AuthController {
  constructor(private api: AuthAPI) {};

  private async request(req: () => void) {
    try {
      Store.set("user.isLoading", true);
      this.setError(undefined);
      await req();
    } catch(e) {
      this.setError(e);
      throw new Error();
    } finally {
      Store.set("user.isLoading", false);
    }
  }

  private setError(e: unknown) {
    if (e instanceof Error) {
      Store.set("user.data", e.message);
    } else if (e){
      Store.set("user.data", e);
    }
  }

  async signup(signupData: SignupData) {
    await this.request(async() => {
      await this.api.signup(signupData);
      await this.fetchUser();
      Router.go("/settings");
    });
  }

  async signin(signinData: SigninData) {
    await this.request(async() => {
      await this.api.signin(signinData);
      await this.fetchUser();
      Router.go("/messenger");
    });
  }

  async logout() {
    await this.request(async() => {
      await this.api.logout();

      MessageController.closeAll();

      Router.go("/");
    });
  }

  async fetchUser() {
    await this.request(async() => {
      const user = await this.api.read();
      Store.set("user.data", user);
      
      const photo = `${HTTPTransport.API_URL}/resources${user.avatar}`;
      Store.set("user.data.photo", photo);
    });
  }
}

export default new AuthController(new AuthAPI());
