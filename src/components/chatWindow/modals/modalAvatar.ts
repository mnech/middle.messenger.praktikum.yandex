import Block from "../../../utils/Block";
import template from "./modal.hbs";

import {default as styles} from "./modal.module.scss";

import UploadFile from "../../uploadFile";
import ChatController from "../../../controlles/ChatController";
import Modal from "../../modal";
import withStore from "../../../hocs/withStore";

interface ModalProps {
  active: boolean,
  selectedChat: string,
  selectedChatPhoto: string,
}

class BaseModal extends Block {
  constructor(props: ModalProps) {
    super(props);
  }

  protected componentDidUpdate(_oldProps: ModalProps, newProps: ModalProps): boolean {
    if (_oldProps.active !== newProps.active) {
      (this.children.modal as Block).setProps({active: newProps.active});
    }

    if (_oldProps.selectedChatPhoto !== newProps.selectedChatPhoto) {
      (this.children.upload as Block).setProps({photo: newProps.selectedChatPhoto});   
    }

    return false;
  }

  init() {
    this.children.upload = new UploadFile({
      photo: this.props.selectedChatPhoto,
      events: {
        req: async (data: FormData) => {
          data.append("chatId", this.props.selectedChat);

          await ChatController.changeChatAvatar(data);

          this.setProps({active: false});
        }
      }
    }),
    this.children.modal = new Modal({
      active: false,
      title: "Choose an avatar for the chat",
      content: this.children.upload,
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
    selectedChatPhoto: state.selectedChatPhoto
  }
});

export const ModalAvatar = withModal(BaseModal);
