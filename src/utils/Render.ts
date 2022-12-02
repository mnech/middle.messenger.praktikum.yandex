export default function render(page: any) {
  
  const root = document.querySelector("#app");

  if (root) {
    root.innerHTML = "";
    root.append(page.getContent()!);
  }
}
