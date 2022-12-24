import Block from "./Block";
import validation from "./validation";
export interface validate {
  value: string;
  error: string;
  errorComponent: Block | null,
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
    errorComponent: null,
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
      this.errorComponent?.setProps({text: this.error});
    },
  };
}

function change(e: Event, input: validate) {
  input.onChange(e);
  if (input.touched) {
    input.errorComponent?.setProps({text: input.error});
  }
}

function focusout(_e: Event, input: validate) {
  input.onBlur();
  if (input.touched) {
    input.errorComponent?.setProps({text: input.error});
  }
}

export function validEvents(input: validate) {
  return {
    change: (e: Event) => change(e, input),
    focusout: (e: Event) => focusout(e, input),
  }
}
