export default function Render(page: any) {
  const root = document.querySelector("#app");

  if (root) {
    root.innerHTML = "";
    root.append(page.getContent()!);
  }
}
