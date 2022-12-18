import Router from "./utils/Router";

import Auth from "./pages/auth";
import Page404 from "./pages/error404";
import Page500 from "./pages/error500";
import Profile from "./pages/profile";
import Chat from "./pages/chat";
import AuthController from "./controlles/AuthController";

enum Routes {
  Index = "/",
  Signup = "/sign-up",
  Page404 = "/page404",
  Page500 = "/page500",
  Profile = "/settings",
  Chat = "/messenger",
}

window.addEventListener("DOMContentLoaded", async ()=> {
  Router
    .use(Routes.Index, Auth, {signin: true})
    .use(Routes.Signup, Auth)
    .use(Routes.Page404, Page404)
    .use(Routes.Page500, Page500)
    .use(Routes.Profile, Profile)
    .use(Routes.Chat, Chat)

    let isProtectedRoute = true;

    switch(window.location.pathname) {
      case Routes.Index:
      case Routes.Signup: 
        isProtectedRoute = false;
        break;
    }

    try {
      await AuthController.fetchUser();
      
      Router.start(); 

      if (!isProtectedRoute) {
        Router.go(Routes.Chat);
      }
    } catch(e) {
      Router.start();

      if (isProtectedRoute) {
        Router.go(Routes.Index);
      }
    }
});

