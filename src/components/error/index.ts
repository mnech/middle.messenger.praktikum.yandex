import Block from "../../utils/Block";
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

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
