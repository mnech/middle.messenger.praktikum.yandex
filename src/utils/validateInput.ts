import Block from "./Block";
import validation from "./validation";
export interface validate {
  value: string;
  error: string;
  touched: boolean;
  name: string;
  onChange(e: Event): void;
  onBlur(): void;
  validate(): void;
}

export default function validateInput(initialValue: string, name: string): validate {
  const error = validation(initialValue, name);

  return {
    value: initialValue,
    error,
    touched: false,
    name,
    onChange(e: Event) {
      this.value = (e.target as HTMLInputElement).value;
      this.error = validation(this.value, name);
    },
    onBlur() {
      this.touched = true;
    },
    validate() {
      this.error = validation(this.value, name);
    }
  };
}

function change(e: Event, input: validate, error: Block) {
  input.onChange(e);
  error.setProps({text: input.error});
}

function focusout(_e: Event, input: validate, error: Block) {
  input.onBlur();
  error.setProps({text: input.error});
}

export function validEvents(input: validate, error: Block) {
  return {
    change: (e: Event) => change(e, input, error),
    focusout: (e: Event) => focusout(e, input, error),
  }
}
