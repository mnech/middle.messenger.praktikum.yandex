import validation from "./validation";

export interface validate {
  value: string;
  touched: boolean;
  error: string;
  onFocus(): void;
  onBlur(e: Event): void;
}

export default function validateInput(initialValue: string, name: string): validate {
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
