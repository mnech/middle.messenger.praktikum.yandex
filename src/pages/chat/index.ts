import Block from "../../utils/Block";
import template from "./chat.hbs";
import Navbar from "../../components/navbar";
import ChatController from "../../controlles/ChatController";

import * as styles from "./chat.module.scss";

import { ChatInfo } from "../../types/interfaces";
import ChatList from "../../components/chatList";
import ChatWindow from "../../components/chatWindow";

interface ChatProps {
  chats: ChatInfo[],
}

export default class Chat extends Block {
  
  constructor(props: ChatProps) {
    super(props);
  }

  init() {
    this.children.chatList = new ChatList({chats: {isLoading: true}});
    this.children.chat = new ChatWindow({});

    ChatController.fetchChats().finally(() => {
      (this.children.chatList as Block).setProps({isLoading: false});
    });

    this.children.navbar = new Navbar();
  }

  render() {
    return this.compile(template, 
      {...this.props, 
        styles, 
      });
  }
}
