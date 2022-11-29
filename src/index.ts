import render from "./utils/render";

import Temp from "./pages/temp";
import Auth from "./pages/auth";
import Page404 from "./pages/error404";
import Page500 from "./pages/error500";
import Profile from "./pages/profile";
import Chat from "./pages/chat";

window.addEventListener("DOMContentLoaded", ()=> {
  render(new Auth({signin: true}));

  const path = window.location.pathname;

  if (path === "/") {
    render(new Temp());
  } else if (path === "/signin/signin.hbs") {
    render(new Auth({signin: true}));
  } else if (path === "/signup/signup.hbs") {
    render(new Auth({signin: false}));
  } else if (path === "/error404/error404.hbs") {
    render(new Page404());
  } else if (path === "/error500/error500.hbs") {
    render(new Page500());
  } else if (path === "/profile/profile.hbs") {
    render(new Profile());
  } else if (path === "/chat/chat.hbs") {
    render(new Chat());
  }
});

