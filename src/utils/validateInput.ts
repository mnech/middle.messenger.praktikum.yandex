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

export function focusin(e: Event, self: Record<string, any>) {
    const name = (e.target as HTMLInputElement).name;
    self[name].onFocus();
}

export function focusout(e: Event, self: Record<string, any>) {
    const name = (e.target as HTMLInputElement).name;
    self[name].onBlur(e);

    //after submit don't need to update props
    if (self.submit) {
      self.submit = false;
      return;
    } 

    self.setProps({name: self[name]});
}
