import Auth from "./pages/auth";
// import Signup from "./pages/signup";

window.addEventListener("DOMContentLoaded", ()=> {
  const root = document.querySelector("#app");
  const chat = new Auth({
    signin: false
  });

  root?.append(chat.getContent()!);
});

