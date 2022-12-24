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

  setZero(num: number) {
    if (num < 10) {
      return `0${num}`
    }
     
    return num;
  } 

  time(time: string) {
    const date = new Date(time);

    const hours = this.setZero(date.getHours());
    const minutes = this.setZero(date.getMinutes());

    return `${hours}:${minutes}`;
  }

  render() {
    return this.compile(template, {
      ...this.props,
      time: this.time(this.props.time),
      styles
    });
  }
}
