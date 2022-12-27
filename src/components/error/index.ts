import Block from "../../utils/Block";
import Router from "../../utils/Router";
import Button from "../button";
import template from "./error.hbs";

import * as styles from "./error.module.scss";

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
        click: () => {
          Router.go("/messenger");
        }
      },
      propStyle: styles.btn,
    });
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
