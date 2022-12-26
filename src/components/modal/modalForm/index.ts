import Block from "../../../utils/Block";
import ButtonIcon from "../../buttonIcon";
import template from "./modalForm.hbs";

import * as styles from "./modalForm.module.scss";

import close from "../../../../static/icons/x.svg";

interface ModalFormProps {
  active: boolean,
  submit: Block | Block[],
  content?: Block | Block[],
  error?: string,
  events: {
    click?: (e: Event) => void,
  },
}

export default class ModalForm extends Block {
  constructor(props: ModalFormProps) {
    super(props);
  }

  init() {
    this.children.close = new ButtonIcon({
      label: "Close",
      icon: close,
      alt: "Close",
      type: "button",
      events: {
        click: () => {
          this.setProps({active: false});
        }
      },
      propStyle: styles.close,
    });
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
