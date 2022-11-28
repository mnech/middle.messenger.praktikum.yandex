import Block from "../../utils/Block";
import template from "./chat.hbs";
import Button from "../../components/button";
import ButtonIcon from "../../components/buttonIcon";
import Input from "../../components/input";
import Navbar from "../../components/navbar";

import styles from "./chat.module.scss";

import photo1 from "../../../static/temp/user_photo1.png";
import photo2 from "../../../static/temp/user_photo2.png";
import photo3 from "../../../static/temp/user_photo3.png";
import photo4 from "../../../static/temp/user_photo4.png";

import plus from "../../../static/icons/plus.svg";
import arrowRigth from "../../../static/icons/arrow_right.svg";
import searchIcon from "../../../static/icons/search.svg";
import optionsIcon from "../../../static/icons/options.svg";
import paperclipIcon from "../../../static/icons/paperclip.svg";


interface ChatProps {
  title: string,
}

const chatList = [
{id: 1, photo: photo1, name: "Evgenya Kukushkina", lastMessage: "Okay! ",
lastMessage_date: "18:30"},
{id: 2, photo: photo2, name: "Kate Semenova", lastMessage: "We are sending dailynewsletters fro...",
lastMessage_date: "10:00"},
{id: 3, photo: photo3, name: "Nikolay Tapochkin", lastMessage: "Thank’s :)))",
lastMessage_date: "Th"},
{id: 4, photo: photo4, name: "Semen Ivanov", lastMessage: "Hi!",
lastMessage_date: "10.11.2022", unread: 3},
]

export default class Chat extends Block {
  constructor(props?: ChatProps) {
    super(props);
  }

  init() {
    this.children.search = new Input({
      type: "text",
      name: "search", 
      placeholder: "Search",
      events: {
        click: () => console.log("input")
      },
      propStyle: styles.search, 
    });
    this.children.message = new Input({
      type: "text",
      name: "message", 
      placeholder: "Type your message...",
      events: {
        click: () => console.log("message")
      },
      propStyle: styles.message, 
    });
    this.children.navbar = new Navbar();
    this.children.newChat = new ButtonIcon({
      label: "Add chat",
      icon: plus,
      alt: "Plus",
      events: {
        click: () => console.log("add chat")
      },
      propStyle: styles.newchat,
    });
    this.children.send = new ButtonIcon({
      label: "Send",
      icon: arrowRigth,
      alt: "Send",
      events: {
        click: () => console.log("send")
      },
    });
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
      events: {
        click: () => console.log("more options")
      },
      propStyle: styles.transp
    });
  }

  render() {
    return this.compile(template, 
      {...this.props, 
        styles, 
        chatList, 
        photo: photo1, 
        searchIcon,
        optionsIcon,
      });
  }
}
