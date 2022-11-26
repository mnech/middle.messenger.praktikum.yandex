import validation from "./validation";

export default function validateInput(initialValue: string, name: string) {
  return {
    value: initialValue,
    touched: false,
    error: "",
    onFocus() {
      this.touched = true;
    },
    onBlur(e: Event) {
      this.value = (e.target as HTMLInputElement).value;
      this.error = validation(this.value, name);
    }
  };

}
