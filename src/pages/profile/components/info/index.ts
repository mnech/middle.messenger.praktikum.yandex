import Block from "../../../../utils/Block";
import template from "./info.hbs";

import styles from "./info.module.scss";

interface InfoProps {
  changeContent: () => void,
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
}

export default class Info extends Block {
  constructor(props?: InfoProps) {
    super(props);
  }

  init() {
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
