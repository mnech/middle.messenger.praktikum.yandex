import Block from "../../utils/Block";
import Button from "../button";
import template from "./error.hbs";

import styles from "./error.module.scss";

interface ErrorProps {
  img: string,
  code: string,
  text: string, 
}

export default class Error extends Block {
  constructor(props: ErrorProps) {
    super(props);
  }

  init() {
    this.children.button = new Button({
      label: "Go back to chat",
      events: {
        click: () => console.log("Go chat")
      },
      class: "btn",
    });
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
