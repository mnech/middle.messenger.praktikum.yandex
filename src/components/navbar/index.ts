import Block from "../../utils/Block";
import template from "./navbar.hbs";
import {default as styles} from "./navbar.module.scss";

import messageIcon from "../../../static/icons/message_circle.svg";
import logoutIcon from "../../../static/icons/log_out.svg";
import AuthController from "../../controlles/AuthController";
import ButtonIcon from "../buttonIcon";
import withStore from "../../hocs/withStore";
import { state } from "../../types/types";

import defPhoto from "../../../static/img/Photo.png";
import { Link } from "../link";

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

  protected componentDidUpdate(_oldProps: NavbarProps, newProps: NavbarProps): boolean {
    (this.children.profile as Block).setProps({
      img: this.getPhoto(newProps.photo),
    });

    return false;
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
    this.children.profile = new Link({
      img: this.getPhoto(this.props.photo),
      label: "Profile",
      to: "/settings",
      styleImg: styles.photo,
    });
    this.children.chat = new Link({
      img: messageIcon,
      label: "Chat",
      to: "/messenger",
    });
  }

  render() {
    return this.compile(template, 
      {...this.props,
      styles,  
      logoutIcon});
  }
}

const withNavbar = withStore((state: state) => (state.user.data) || {photo: defPhoto});

export default withNavbar(Navbar);
