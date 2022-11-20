import Block from "../../utils/Block";
import template from "./button.hbs";
import styles from "./button.module.scss";

interface ButtonProps {
  label: string,
  events: {
    click: () => void
  }
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, {label: this.props.label, styles});
  }
}
