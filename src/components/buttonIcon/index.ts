import Block from "../../utils/Block";
import template from "./buttonIcon.hbs";
import styles from "./buttonIcon.module.scss";

interface ButtonIconProps {
  label: string,
  type?: string,
  icon: string,
  alt: string,
  events: {
    click: (e: Event) => void,
  }, 
  propStyle?: string,
}

export default class ButtonIcon extends Block {
  constructor(props: ButtonIconProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
