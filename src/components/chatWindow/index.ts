import withStore from "../../hocs/withStore";
import Block from "../../utils/Block";
import ButtonIcon from "../buttonIcon";
import Message from "../message";
import template from "./chatWindow.hbs";
import FormInput from "../FormInput";

import validateInput, {validate} from "../../utils/validateInput";
import validationForm from "../../utils/validationForm";

import {default as styles} from "./chatWindow.module.scss";

import searchIcon from "../../../static/icons/search.svg";
import optionsIcon from "../../../static/icons/options.svg";
import arrowRigth from "../../../static/icons/arrow_right.svg";
import MessageController from "../../controlles/MessageController";
import DropDown from "../dropDown";
import Button from "../button";
import { ModalAvatar } from "./modals/modalAvatar";
import { ModalUser } from "./modals/modalUser";
import { ModalDelete } from "./modals/modalDelete";

interface ChatWindowProps {
  selectedChat: number | undefined;
  messages: any[],
  userId: number,
  errorModalChat: string,
}

class ChatWindow extends Block {
  private activeOptions: boolean = false;
  private message!: validate;
  private onSubmit = validationForm(this.message);

  constructor(props: ChatWindowProps) {
    super(props);
  }

  createMessages(props: ChatWindowProps) {
    if (!props.messages) {
      return props.messages;
    }

    return props.messages.map(data => {
      return new Message({
        ...data, 
        send: props.userId === data.user_id,
      });
    });
  }

  closeDropDown = (e: Event) => {
    const target = (e.target as HTMLInputElement);
    if (!(target.parentNode  as HTMLInputElement).matches(".dropbtn")) {
      if (this.activeOptions) {
        this.activeOptions = !this.activeOptions;
        (this.children.options as Block).setProps({active: this.activeOptions});
        window.removeEventListener("click", this.closeDropDown);
      }
    }
  }

  onDropDown() {
    window.addEventListener("click", this.closeDropDown);
  }

  init() {
    this.message = validateInput("", "");

    this.children.messages = this.createMessages(this.props as ChatWindowProps);

    this.children.searchChat = new ButtonIcon({
      label: "Search message",
      icon: searchIcon,
      alt: "Search",
      events: {
        click: () => console.log("search")
      },
      propStyle: styles.transp
    });
    this.children.options = new DropDown({
      active: this.activeOptions,
      button: new ButtonIcon({
        label: "Options",
        icon: optionsIcon,
        alt: "Options",
        events: {
          click: () => {
            this.activeOptions = !this.activeOptions;
            (this.children.options as Block).setProps({active: this.activeOptions});
            this.onDropDown();
          }
        },
        propStyle: `${styles.transp} dropbtn`
      }),
      list: [
        new Button({
        label: "Add user",
        events: {
          click: () => {
            (this.children.modalAddUser as Block).setProps({active: true});
          }
        },
        }),
        new Button({
          label: "Remove user",
          events: {
            click: () => {
              (this.children.modalRemoveUser as Block).setProps({active: true});
            }
          },
        }),
        new Button({
          label: "Delete chat",
          events: {
            click: () => {
              (this.children.modalDeleteChat as Block).setProps({active: true});
            }
          },
        }),
        new Button({
          label: "Change avatar",
          events: {
            click: () => {
              (this.children.modalAvatar as Block).setProps({active: true });
            }
          },
        }),
        ],
    });
    this.children.message = new FormInput({
      type: "text",
      name: "message", 
      placeholder: "Type your message...",
      validation: this.message,
      propStyle: styles.message, 
    });
    this.children.send = new ButtonIcon({
      label: "Send",
      icon: arrowRigth,
      alt: "Send",
      type: "submit",
      events: {
        click: (e) => {
          this.onSubmit(e);
          
          if (this.message.value) {
            MessageController.sendMessage(this.props.selectedChat, this.message.value);

            this.message.value = "";
            (this.children.message as Block).setProps({validation: this.message});
          } 
        }
      },
    });

    this.children.modalAddUser = new ModalUser({active: false, addUser: true});

    this.children.modalRemoveUser = new ModalUser({active: false, addUser: false});

    this.children.modalDeleteChat = new ModalDelete({active: false});    

    this.children.modalAvatar = new ModalAvatar({active: false});
  }

  protected componentDidUpdate(_oldProps: ChatWindowProps, newProps: ChatWindowProps): boolean {
    this.children.messages = this.createMessages(newProps);

    return true;
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

const withChatWindow = withStore(state => {
  const chatId = state.selectedChat;

  if (!chatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id,
      chatError: "",
    }
  }

  return {
    messages: (state.messages || {})[chatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.data.id,
    errorModalChat: state.errorModalChat,
  }
});

export default withChatWindow(ChatWindow);
