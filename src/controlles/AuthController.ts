import { AuthAPI } from "../api/AuthAPI";
import { SigninData, SignupData } from "../types/interfaces";
import Router from "../utils/Router";
import Store from "../utils/Store";

class AuthController {
  private api = new AuthAPI();

  private setError(e: unknown) {
    if (e instanceof Error) {
      Store.set("user.data", e.message);
    } else {
      Store.set("user.data", e);
    }
  }

  async signup(signupData: SignupData) {
    try {
      await this.api.signup(signupData);
      await this.fetchUser();

      Router.go("/settings");
    } catch(e) {
      this.setError(e);
    }
  }

  async signin(signinData: SigninData) {
    try {
      await this.api.signin(signinData);
      await this.fetchUser();

      Router.go("/settings");
    } catch(e) {
      this.setError(e);
    }
  }

  async logout() {
    try {
      await this.api.logout();

      Router.go("/");
    } catch(e) {
      this.setError(e);
    }
  }

  async fetchUser() {
    Store.set("user.isLoading", true);
    
    try {
      const user = await this.api.read();
      Store.set("user.data", user);
    } catch(e) {
      this.setError(e);
    } finally {
      Store.set("user.isLoading", false);
    }
  }
}

export default new AuthController();
