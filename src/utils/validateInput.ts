import validation from "./validation";
export interface validate {
  value: string;
  error: string;
  name: string;
  onCheck(e: Event): void;
  validate(): void;
}

export default function validateInput(initialValue: string, name: string): validate {
  return {
    value: initialValue,
    error: "",
    name,
    onCheck(e: Event) {
      this.value = (e.target as HTMLInputElement).value;
      this.error = validation(this.value, name);
      console.log("check", this.error)
    },
    validate() {
      this.error = validation(this.value, name);
    }
  };
}

function check(e: Event, self: Record<string, any>) {
    const name = (e.target as HTMLInputElement).name;
    self[name].onCheck(e);

    //after submit don't need to update props
    if (self.submit) {
      self.submit = false;
      return;
    } 

    self.setProps({name: self[name]});
}

export function validEvents(self: Record<string, any>) {
  return {
    change: (e: Event) => check(e, self),
    focusout: (e: Event) => check(e, self),
  }
}
