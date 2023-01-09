import { PropsWithRouter, withRouter } from "../../hocs/withRouter";
import Block from "../../utils/Block";
import template from "./link.hbs";
import {default as styles} from "./link.module.scss";

interface LinkProps extends PropsWithRouter {
  label: string,
  to: string,
  styleLink?: string,
  styleImg?: string,
  img?: string,
  events?: {
    click: () => void;
  }
}

export class BaseLink extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate()
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

export const Link = withRouter(BaseLink);
