import ChatController from "../../controlles/ChatController";
import withStore from "../../hocs/withStore";
import { ChatInfo } from "../../types/interfaces";
import { state } from "../../types/types";
import Block from "../../utils/Block";
import ButtonIcon from "../buttonIcon";
import ChatItem from "../chatItem";
import Input from "../input";
import template from "./chatList.hbs";

import * as styles from "./chatList.module.scss";

import plus from "../../../static/icons/plus.svg";
import Modal from "../modal";
import Button from "../button";
import FormInput from "../FormInput";
import validateInput, { validate } from "../../utils/validateInput";
import validationForm from "../../utils/validationForm";

import defPhoto from "../../../static/img/Photo.png";
import Store from "../../utils/Store";

interface ChatListProps {
  chats: ChatInfo[] | [],
  isLoading: boolean,
  selectedChat: ChatInfo,
  createChat: string,
  search: string,
}

class ChatList extends Block {
  private chat_name!: validate;
  private onSubmit = validationForm(this.chat_name);

  constructor(props: ChatListProps) {
    super(props);
  }

  async addChat(e: Event) {
    e.preventDefault();
    
    const data = this.onSubmit(e);
            
    if (data) {
      await ChatController.create(this.chat_name.value);

      if (!this.props.createChat) {
        (this.children.modal as Block).setProps({active: false});
      } else {
        (this.children.modal as Block).setProps({error: this.props.createChat});
      }
    }
  }

  createChats(props: ChatListProps) {
    if (!props.chats) {
      return props.chats;
    }

    const selectedChat = Store.getState().selectedChat;
    let chats = props.chats;

    if (this.props.search) {
      chats = chats.filter(chat => chat.title.toLowerCase().includes(this.props.search));
    }

    return chats.map(data => {
      return new ChatItem({
        photo: data.photo || defPhoto,
        title: data.title,
        lastMessage: data.last_message,
        unread_count: data.unread_count,
        active: selectedChat === data.id,
        events: {
          click: () => {
            ChatController.selectChat(data.id, data.photo || defPhoto);
          }
        },
      })
    });
  }

  init() {
    this.children.chats = this.createChats(this.props as ChatListProps);

    this.chat_name = validateInput("", "required");

    this.children.search = new Input({
      type: "text",
      name: "search", 
      placeholder: "Search",
      events: {
        change: (e) => {
          Store.set("search", (e.target as HTMLInputElement).value.toLowerCase());
        }
      },
      propStyle: styles.search, 
    });
    
    this.children.newChat = new ButtonIcon({
      label: "Add chat",
      icon: plus,
      alt: "Plus",
      events: {
        click: () => {
          (this.children.modal as Block).setProps({active: true});
        }
      },
      propStyle: styles.newchat,
    });
    this.children.modal = new Modal({
      active: false,
      title: "Create chat",
      content: new FormInput({
        label: "Chat name",
        type: "text",
        name: "chat_name", 
        placeholder: "Enter chat name...",
        validation: this.chat_name,
      }),
      submit: new Button({
        label: "Ok",
        events: {
          click: (e: Event) => {
            this.addChat(e);
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

  componentDidUpdate(_oldProps: ChatListProps, newProps: ChatListProps): boolean {
    this.children.chats = this.createChats(newProps);

    return true;
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

const withChatList = withStore((state: state) => {
  if (state.chats) {
    return {
      chats: [...state.chats],
      createChat: state.createChat,
      search: state.search,
    }
  } else {
    return {
      chats: [],
      createChat: "",
      search: state.search,
    }
  }
});

  

export default withChatList(ChatList);
