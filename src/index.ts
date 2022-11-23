import Chat from "./pages/chat";
import Profile from "./pages/profile";

window.addEventListener("DOMContentLoaded", ()=> {
  const root = document.querySelector("#app");
  const chat = new Profile();

  root?.append(chat.getContent()!);
});

