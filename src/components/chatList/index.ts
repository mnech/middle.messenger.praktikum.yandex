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

interface ChatListProps {
  chats: ChatInfo[] | [],
  isLoading: boolean,
}

class ChatList extends Block {
  constructor(props: ChatListProps) {
    super(props);
  }

  createChats(props: ChatListProps) {
    return props.chats.map(data => {
      return new ChatItem({
        photo: data.avatar,
        title: data.title,
        lastMessage: data.last_message,
        unread_count: data.unread_count,
        events: {
          click: () => {
            ChatController.selectChat(data.id);
          }
        },
      })
    });
  }

  init() {
    this.children.chats = this.createChats(this.props as ChatListProps);

    this.children.search = new Input({
      type: "text",
      name: "search", 
      placeholder: "Search",
      events: {
        click: () => console.log("search")
      },
      propStyle: styles.search, 
    });
    
    this.children.newChat = new ButtonIcon({
      label: "Add chat",
      icon: plus,
      alt: "Plus",
      events: {
        click: () => console.log("add chat")
      },
      propStyle: styles.newchat,
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
      chats: [...state.chats]
    }
  } else {
    return {
      chats: []
    }
  }
});

  

export default withChatList(ChatList);
