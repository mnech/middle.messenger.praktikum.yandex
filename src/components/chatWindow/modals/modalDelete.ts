import Block from "../../../utils/Block";
import template from "./modal.hbs";

import {default as styles} from "./modal.module.scss";
import ChatController from "../../../controlles/ChatController";
import Modal from "../../modal";
import withStore from "../../../hocs/withStore";
import Button from "../../button";

interface ModalProps {
  active: boolean,
  selectedChat: number | undefined,
  errorModalChat: string
}

class BaseModal extends Block {
  constructor(props: ModalProps) {
    super(props);
  }

  async deleteChat(e: Event) {
    e.preventDefault();

    await ChatController.delete(this.props.selectedChat);

    if (!this.props.errorModalChat) {
      this.setProps({active: false});
    } else {
      (this.children.modal as Block).setProps({error: this.props.errorModalChat});
    }
  }

  protected componentDidUpdate(_oldProps: ModalProps, newProps: ModalProps): boolean {
    if (_oldProps.active !== newProps.active) {
      (this.children.modal as Block).setProps({active: newProps.active});
    }

    return false;
  }

  init() {
    this.children.modal = new Modal({
      active: false,
      title: "Delete this chat?",
      submit: new Button({
        label: "Ok",
        events: {
          click: (e: Event) => {
            this.deleteChat(e); 
          }
        },
        propStyle: styles.btn,
      }),
      events: {
        click: () => {
          this.setProps({active: false});
        }
      },
    });  
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

const withModal = withStore(state => {
  return {
    selectedChat: state.selectedChat,
    errorModalChat: state.errorModalChat
  }
});

export const ModalDelete = withModal(BaseModal);
