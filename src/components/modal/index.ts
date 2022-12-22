import Block from "../../utils/Block";
import template from "./modal.hbs";
import * as styles from "./modal.module.scss";

import ModalForm from "./modalForm";

interface ModalProps {
  active: boolean,
  events: {
    click?: (e: Event) => void,
  },
  submit: Block | Block[],
  content: Block | Block[],
  propStyle?: string,
}

export default class Modal extends Block {
  constructor(props: ModalProps) {
    super(props);
  }

  protected componentDidUpdate(_oldProps: ModalProps, newProps: ModalProps): boolean {
    (this.children.form as Block).setProps({active: newProps.active});

    return true;
  }

  init() {
    console.log("modal", this.children)
    this.children.form = new ModalForm({
      active: false,
      submit: this.children.submit,
      content: this.children.content,
      events: {
        click: (e: Event) => {
          e.stopPropagation();
        }
      },
    });
    
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}