import Block from "../../utils/Block";
import template from "./dropDown.hbs";

import * as styles from "./dropDown.module.scss";

interface DropDownProps {
  active: boolean,
  button: Block,
  list: Block[],
}

export default class DropDown extends Block {
  constructor(props: DropDownProps) {
    super(props);
  }

  init() {
    (this.children.list as Block[]).forEach(el => {
      el.setProps({propStyle: styles.btn});
    });
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
