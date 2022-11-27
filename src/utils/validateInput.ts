import validation from "./validation";

export interface validate {
  value: string;
  touched: boolean;
  error: string;
  name: string;
  onFocus(): void;
  onBlur(e: Event): void;
  validate(): void;
}

export default function validateInput(initialValue: string, name: string): validate {
  return {
    value: initialValue,
    touched: false,
    error: "",
    name,
    onFocus() {
      this.touched = true;
    },
    onBlur(e: Event) {
      this.value = (e.target as HTMLInputElement).value;
      this.error = validation(this.value, name);
    },
    validate() {
      this.error = validation(this.value, name);
    }
  };

}
