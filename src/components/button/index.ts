import Block from "../../utils/Block";
import template from "./button.hbs";
import {default as styles} from "./button.module.scss";

interface ButtonProps {
  label: string,
  type?: string,
  events: {
    click: (e: any) => void,
  }, 
  propStyle?: string,
  secondary?: boolean,
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  secondary(): string {
    return this.props.secondary ? styles.secondary : "";
  } 

  render() {
    return this.compile(template, {...this.props, styles, secondary: this.secondary()});
  }
}
