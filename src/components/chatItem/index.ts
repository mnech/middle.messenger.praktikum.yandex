import Block from "../../utils/Block";
import template from "./chatItem.hbs";
import * as styles from "./chatItem.module.scss";

interface ChatItemProps {
  photo: string,
  title: string,
  lastMessage: Record<string, any>,
  unread_count: number,
  active: boolean,
  events: {
    click: (e: any) => void,
  }, 
}

export default class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
