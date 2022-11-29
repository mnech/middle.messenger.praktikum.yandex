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

  console.log(path);

  if (path === "/") {
    render(new Temp());
  } else if (path === "/signin") {
    render(new Auth({signin: true}));
  } else if (path === "/signup") {
    render(new Auth({signin: false}));
  } else if (path === "/error404") {
    render(new Page404());
  } else if (path === "/error500") {
    render(new Page500());
  } else if (path === "/profile") {
    render(new Profile());
  } else if (path === "/chat") {
    render(new Chat());
  }
});

