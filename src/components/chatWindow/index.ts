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

interface ChatWindowProps {
  selectedChat: number | undefined;
  messages: any[],
  userId: number;
}

class ChatWindow extends Block {
  private message!: validate;
  private onSubmit = validationForm(this.message);

  constructor(props: ChatWindowProps) {
    super(props);
  }

  createMessages(props: ChatWindowProps) {
    return props.messages.map(data => {
      return new Message({
        ...data, 
        send: props.userId === data.user_id,
      });
    });
  }

  init() {
    this.message = validateInput("", "message");

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
    this.children.options = new ButtonIcon({
      label: "Options",
      icon: optionsIcon,
      alt: "Options",
      events: {
        click: () => console.log("options")
      },
      propStyle: styles.transp
    });
    this.children.moreOptions = new ButtonIcon({
      label: "More options",
      icon: paperclipIcon,
      alt: "paperclip",
      type: "button",
      events: {
        click: () => console.log("more options")
      },
      propStyle: styles.transp
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
          this.setProps({message: this.message});
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
    userId: state.user.id
  }
});

export default withChatWindow(ChatWindow);
 