import Chat from "./pages/chat";

window.addEventListener("DOMContentLoaded", ()=> {
  const root = document.querySelector("#app");
  const chat = new Chat();

  root?.append(chat.getContent()!);
});

