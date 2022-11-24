import Block from "../../utils/Block";
import template from "./input.hbs";
import styles from "./input.module.scss";

interface InputProps {
  label?: string,
  type: string,
  name: string, 
  placeholder: string,
  errorText?: string,
  events: {
    click: () => void
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
