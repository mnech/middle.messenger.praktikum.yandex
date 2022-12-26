import Block from "../../../utils/Block";
import template from "./modal.hbs";

import * as styles from "./modal.module.scss";
import ChatController from "../../../controlles/ChatController";
import Modal from "../../modal";
import withStore from "../../../hocs/withStore";
import validateInput, { validate } from "../../../utils/validateInput";
import validationForm from "../../../utils/validationForm";
import FormInput from "../../FormInput";
import Button from "../../button";
import ProfileController from "../../../controlles/ProfileController";
import Store from "../../../utils/Store";

interface ModalProps {
  active: boolean,
  addUser: boolean,
  selectedChat: number | undefined,
  errorModalChat: string,
}

class BaseModal extends Block {
  private user_login!: validate;
  private onSubmit = validationForm(this.user_login);

  constructor(props: ModalProps) {
    super(props);
  }

  async addOrRemoveUser(e: Event) {
    e.preventDefault();
    const data = this.onSubmit(e);

    if (data) {
      await ProfileController.searchByLogin(this.user_login.value);
      const friend = Store.getState().friend;

      if (Array.isArray(friend) && friend.length) {
        const id = Store.getState().friend[0].id;

        if (this.props.addUser) {
          await ChatController.addUserToChat(this.props.selectedChat, id);
        } else {
          await ChatController.removeUserFromChat(this.props.selectedChat, id);
        }
      }

      if (!this.props.errorModalChat) {
        this.setProps({active: false});
      } else {
        (this.children.modal as Block).setProps({error: this.props.errorModalChat});
      }
    }
  }

  protected componentDidUpdate(_oldProps: ModalProps, newProps: ModalProps): boolean {
    if (_oldProps.active !== newProps.active) {
      (this.children.modal as Block).setProps({active: newProps.active});
    }
    
    return false;
  }


  init() {
    this.user_login = validateInput("", "required");

    this.children.modal = new Modal({
      active: false,
      title: this.props.addUser ? "Add user to chat": "Remove user from chat",
      content: new FormInput({
        label: "User login",
        type: "text",
        name: "user_login", 
        placeholder: "Enter user login...",
        validation: this.user_login,
      }),
      submit: new Button({
        label: "Ok",
        events: {
          click: (e: Event) => {
            this.addOrRemoveUser(e); 
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

export const ModalUser = withModal(BaseModal);
