import Profile from "./pages/profile";
// import Signup from "./pages/signup";

window.addEventListener("DOMContentLoaded", ()=> {
  const root = document.querySelector("#app");
  const chat = new Profile();

  root?.append(chat.getContent()!);
});

