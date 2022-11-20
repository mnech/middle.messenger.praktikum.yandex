import { registerComponent } from "./utils/registerComponent";
import Chat from "./pages/chat";
import Button from "./components/button";

registerComponent('Button', Button);

window.addEventListener("DOMContentLoaded", ()=> {
  const root = document.querySelector("#app");
  const chat = new Chat({title: "test"});

  root?.append(chat.getContent()!);
});
