import Block from "../../utils/Block";
import template from "./navbar.hbs";
import * as styles from "./navbar.module.scss";

import messageIcon from "../../../static/icons/message_circle.svg";
import logoutIcon from "../../../static/icons/log_out.svg";
import AuthController from "../../controlles/AuthController";
import ButtonIcon from "../buttonIcon";
import withStore from "../../hocs/withStore";
import { state } from "../../types/types";

import defPhoto from "../../../static/img/Photo.png";

interface NavbarProps {
  photo?: string,
}

class Navbar extends Block {
  constructor(props?: NavbarProps) {
    super(props);
  }

  getPhoto(photo: string | undefined) {
    return photo || defPhoto;
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
      messageIcon,
      logoutIcon});
  }
}

const withNavbar = withStore((state: state) => (state.user.data.avatar || {photo: defPhoto}));

export default withNavbar(Navbar);
