import Block from "../../utils/Block";
import template from "./input.hbs";
import {default as styles} from "./input.module.scss";

interface InputProps {
  label?: string,
  id?: string,
  accept?: string,
  type: string,
  name: string, 
  placeholder: string,
  value?: string,
  events: {
    click?: (e: Event) => void,
    change?: (e: Event) => void,
    focusout?: (e: Event) => void,
    input?: (e: Event) => void,
  },
  propStyle?: string,
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  public setValue(value: string) {
    return (this.element as HTMLInputElement).value = value;
  }

  public getName() {
    return (this.element as HTMLInputElement).name;
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
