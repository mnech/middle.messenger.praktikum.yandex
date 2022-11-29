import Render from "./utils/Render";

import Temp from "./pages/temp";
import Auth from "./pages/auth";
import Page404 from "./pages/error404";
import Page500 from "./pages/error500";
import Profile from "./pages/profile";
import Chat from "./pages/chat";

window.addEventListener("DOMContentLoaded", ()=> {
  Render(new Auth({signin: true}));

  const path = window.location.pathname;

  if (path === "/") {
    Render(new Temp());
  } else if (path === "/signin/signin.hbs") {
    Render(new Auth({signin: true}));
  } else if (path === "/signup/signup.hbs") {
    Render(new Auth({signin: false}));
  } else if (path === "/error404/error404.hbs") {
    Render(new Page404());
  } else if (path === "/error500/error500.hbs") {
    Render(new Page500());
  } else if (path === "/profile/profile.hbs") {
    Render(new Profile());
  } else if (path === "/chat/chat.hbs") {
    Render(new Chat());
  }
});

