import Chat from "./pages/chat";
import Signin from "./pages/signin";

window.addEventListener("DOMContentLoaded", ()=> {
  const root = document.querySelector("#app");
  const chat = new Signin();

  root?.append(chat.getContent()!);
});

