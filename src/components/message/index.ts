import Block from "../../utils/Block";
import template from "./message.hbs";
import * as styles from "./message.module.scss";

interface MessageProps {
  content: string,
  time: string,
  send: boolean,
}

export default class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
