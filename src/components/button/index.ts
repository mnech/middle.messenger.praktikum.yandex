import Block from "../../utils/Block";
import template from "./button.hbs";
import styles from "./button.module.scss";

interface ButtonProps {
  label: string,
  type?: string,
  events: {
    click: (e: Event) => void,
  }, 
  propStyle?: string,
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
