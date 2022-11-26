import Signin from "./pages/signin";
// import Signup from "./pages/signup";

window.addEventListener("DOMContentLoaded", ()=> {
  const root = document.querySelector("#app");
  const chat = new Signin();

  root?.append(chat.getContent()!);
});

