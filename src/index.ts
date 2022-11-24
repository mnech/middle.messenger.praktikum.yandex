import Chat from "./pages/chat";
// import Signup from "./pages/signup";

window.addEventListener("DOMContentLoaded", ()=> {
  const root = document.querySelector("#app");
  const chat = new Chat();

  root?.append(chat.getContent()!);
});

