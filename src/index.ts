import Auth from "./pages/auth";
// import Signup from "./pages/signup";

window.addEventListener("DOMContentLoaded", ()=> {
  const root = document.querySelector("#app");
  const page = new Auth({
    signin: true,
  });

  root?.append(page.getContent()!);
});

