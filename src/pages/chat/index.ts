import Block from "../../utils/Block";
import template from "./chat.hbs";
import Button from "../../components/button";
import Input from "../../components/input";

import styles from "./chat.module.scss";

interface ChatProps {
  title: string,
}

export default class Chat extends Block {
  constructor(props?: ChatProps) {
    super(props);
  }

  init() {
    this.children.button = new Button({
      label: "Click me",
      events: {
        click: () => console.log("hi")
      }
    });
    this.children.input = new Input({
      label: "test",
      type: "text",
      name: "myInput", 
      placeholder: "Введите текст",
      errorText: "Ошибка",
      events: {
        click: () => console.log("input")
      }   
    });
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
