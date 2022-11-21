import Chat from "./pages/chat";

window.addEventListener("DOMContentLoaded", ()=> {
  const root = document.querySelector("#app");
  const chat = new Chat({title: "test"});

  root?.append(chat.getContent()!);

  setTimeout(() => {
    chat.setProps({title: "update"})
  }, 1000);
});
