import Router from "./utils/Router";

import Auth from "./pages/auth";
import Page404 from "./pages/error404";
import Page500 from "./pages/error500";
import Profile from "./pages/profile";
import Chat from "./pages/chat";
import AuthController from "./controlles/AuthController";
import { Content } from "./types/types";
import "./controlles/MessageController";
import Store from "./utils/Store";

enum Routes {
  Index = "/",
  Signup = "/sign-up",
  Page404 = "/page404",
  Page500 = "/page500",
  Profile = "/settings",
  ProfileInfo = "/settings/info",
  ProfilePassword = "/settings/password",
  Chat = "/messenger",
}

window.addEventListener("DOMContentLoaded", async ()=> {
  Router
    .use(Routes.Index, Auth, {signin: true})
    .use(Routes.Signup, Auth)
    .use(Routes.Page404, Page404)
    .use(Routes.Page500, Page500)
    .use(Routes.Profile, Profile, {content: Content.Info})
    .use(Routes.ProfileInfo, Profile, {content: Content.EditProfile})
    .use(Routes.ProfilePassword, Profile, {content: Content.ChangePassword})
    .use(Routes.Chat, Chat)

    let isProtectedRoute = true;

    switch(window.location.pathname) {
      case Routes.Index:
      case Routes.Signup: 
        isProtectedRoute = false;
        break;
    }

    await AuthController.fetchUser();
      
    const error = Store.getState().fetchUser;

    Router.start();

    if (error) {
      if (isProtectedRoute) {
        Router.go(Routes.Index);
      }
    } else {
      if (!isProtectedRoute) {
        Router.go(Routes.Chat);
      }
    }
});

