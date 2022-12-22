import withStore from "../../hocs/withStore";
import Block from "../../utils/Block";
import ButtonIcon from "../buttonIcon";
import Message from "../message";
import template from "./chatWindow.hbs";
import FormInput from "../FormInput";

import validateInput, {validate} from "../../utils/validateInput";
import validationForm from "../../utils/validationForm";

import * as styles from "./chatWindow.module.scss";

import searchIcon from "../../../static/icons/search.svg";
import optionsIcon from "../../../static/icons/options.svg";
import paperclipIcon from "../../../static/icons/paperclip.svg";
import arrowRigth from "../../../static/icons/arrow_right.svg";
import MessageController from "../../controlles/MessageController";
import DropDown from "../dropDown";
import Button from "../button";
import Modal from "../modal";
import ChatController from "../../controlles/ChatController";
import ProfileController from "../../controlles/ProfileController";
import Store from "../../utils/Store";

interface ChatWindowProps {
  selectedChat: number | undefined;
  messages: any[],
  userId: number;
}

class ChatWindow extends Block {
  private activeOptions: boolean = false;
  private message!: validate;
  private user_login!: validate;
  private onSubmit = validationForm(this.message);
  private onSubmitModal = validationForm(this.user_login);

  constructor(props: ChatWindowProps) {
    super(props);
  }

  createMessages(props: ChatWindowProps) {
    return props.messages.map(data => {
      console.log(props, data.user_id)
      return new Message({
        ...data, 
        send: props.userId === data.user_id,
      });
    });
  }

  closeDropDown = (e: Event) => {
    const target = (e.target as HTMLInputElement);
    if (!(target.parentNode  as HTMLInputElement).matches('.dropbtn')) {
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

  async addUser(e: Event) {
    e.preventDefault();
    const data = this.onSubmitModal(e);

    if (data) {
      await ProfileController.searchByLogin(this.user_login.value);
      const id = Store.getState().friend[0].id;
      ChatController.addUserToChat(this.props.selectedChat, id);
    }
  }

  init() {
    console.log(this.props)
    this.message = validateInput("", "message");
    this.user_login = validateInput("", "required");

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
      list: [new Button({
        label: "Add user to chat",
        events: {
          click: () => {
            (this.children.modal as Block).setProps({active: true});
          }
        },
      })],
    });
    this.children.moreOptions = new ButtonIcon({
      label: "More options",
      icon: paperclipIcon,
      alt: "paperclip",
      type: "button",
      events: {
        click: () => console.log("more options")
      },
      propStyle: styles.transp,
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
          const data = this.onSubmit(e);
          if (data) {
            MessageController.sendMessage(this.props.selectedChat, this.message.value);
          } 
        }
      },
    });
    this.children.modal = new Modal({
      active: false,
      content: new FormInput({
        label: "User login",
        type: "text",
        name: "user_login", 
        placeholder: "Enter user login...",
        validation: this.user_login,
      }),
      submit: new Button({
        label: "Add",
        events: {
          click: (e: Event) => {
            this.addUser(e); 
          }
        },
        propStyle: styles.btn,
      }),
      events: {
        click: () => {
          (this.children.modal as Block).setProps({active: false});
        }
      },
    });
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
  console.log(state);

  if (!chatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user.id
    }
  }

  return {
    messages: (state.messages || {})[chatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user.data.id
  }
});

export default withChatWindow(ChatWindow);
 