import Block from "../../utils/Block";
import template from "./chat.hbs";
import Button from "../../components/button";

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
  }

  render() {
    return this.compile(template, {title: this.props.title});
  }
}
