import Block from "../../utils/Block";
import template from "./navbar.hbs";
import * as styles from "./navbar.module.scss";

import userPhoto from "../../../static/temp/User_photo.png";
import messageIcon from "../../../static/icons/message_circle.svg";
import logoutIcon from "../../../static/icons/log_out.svg";
import AuthController from "../../controlles/AuthController";
import ButtonIcon from "../buttonIcon";

interface NavbarProps {}

export default class Navbar extends Block {
  constructor(props?: NavbarProps) {
    super(props);
  }

  init() {
    this.children.logout = new ButtonIcon({
      label: "Log out",
      icon: logoutIcon,
      alt: "Log out",
      type: "button",
      events: {
        click: () => {
          AuthController.logout();
        }
      }, 
      propStyle: styles.transp,
    });
  }

  render() {
    return this.compile(template, 
      {...this.props,
      styles, 
      userPhoto, 
      messageIcon,
      logoutIcon});
  }
}
