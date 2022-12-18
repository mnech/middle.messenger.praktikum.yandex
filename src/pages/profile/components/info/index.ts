import Block from "../../../../utils/Block";
import template from "./info.hbs";
import Button from "../../../../components/button";
import { Content } from "../../../../types/types";

import * as styles from "./info.module.scss";
import Router from "../../../../utils/Router";

interface InfoProps {
  changeContent: (content: Content) => void,
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
}

export default class Info extends Block {
  constructor(props?: InfoProps) {
    super(props);
  }

  init() {
    this.children.editProfile = new Button({
      label: "Edit profile",
      events: {
        click: () => {
          Router.go("/settings/info");;
        }
      }, 
      propStyle: styles.btn
    });
    this.children.changePassword = new Button({
      label: "Change password",
      events: {
        click: () => {
          Router.go("/settings/password");
        }
      }, 
      propStyle: styles.btn
    });
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
