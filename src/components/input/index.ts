import Block from "../../utils/Block";
import template from "./input.hbs";
import * as styles from "./input.module.scss";

interface InputProps {
  label?: string,
  type: string,
  name: string, 
  placeholder: string,
  value?: string,
  events: {
    click?: (e: Event) => void,
    change?: (e: Event) => void,
    focusout?: (e: Event) => void,
  },
  propStyle?: string,
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
