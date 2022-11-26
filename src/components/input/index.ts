import Block from "../../utils/Block";
import template from "./input.hbs";
import styles from "./input.module.scss";

interface InputProps {
  label?: string,
  type: string,
  name: string, 
  placeholder: string,
  events: {
    click?: () => void,
    focusin?: () => void,
    focusout?: () => void,
  },
  propStyle?: string,
  validate?: () => void,
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
