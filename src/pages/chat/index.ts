import Block from "../../utils/Block";
import template from "./chat.hbs";
import Button from "../../components/button";
import Input from "../../components/input";
import Navbar from "../../components/navbar";

import styles from "./chat.module.scss";

import photo1 from "../../../static/temp/user_photo1.png";
import photo2 from "../../../static/temp/user_photo2.png";
import photo3 from "../../../static/temp/user_photo3.png";
import photo4 from "../../../static/temp/user_photo4.png";

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
const messeges = [
{incoming: true, text: "Hello. How are you??", date: "16.11.2022 11:30:32"},
{incoming: false, text: "Hii. I’m fine", date: "16.11.2022 11:30:32"}
]

export default class Chat extends Block {
  constructor(props?: ChatProps) {
    super(props);
  }

  init() {
    this.children.navbar = new Navbar();
    this.children.newChat = new Button({
      label: "Add chat",
      events: {
        click: () => console.log("hi")
      },
      propStyle: styles.newchat,
    });
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
        click: () => console.log("input")
      },
      propStyle: styles.message, 
    });
    this.children.send = new Button({
      label: "Send",
      events: {
        click: () => console.log("hi")
      },
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
        paperclipIcon
      });
  }
}
