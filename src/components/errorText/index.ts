import Block from "../../utils/Block";
import template from "./errorText.hbs";

import * as styles from "./errorText.module.scss";

interface ErrorTextProps {
  error?: string,
}

export default class ErrorText extends Block {
  constructor(props: ErrorTextProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
