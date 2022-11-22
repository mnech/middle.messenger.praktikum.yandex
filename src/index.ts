import Chat from "./pages/chat";
import Page500 from "./pages/error500";

window.addEventListener("DOMContentLoaded", ()=> {
  const root = document.querySelector("#app");
  const chat = new Page500();

  root?.append(chat.getContent()!);
});

