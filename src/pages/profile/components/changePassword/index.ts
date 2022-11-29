import Block from "../../../../utils/Block";
import template from "./changePassword.hbs";
import Input from "../../../../components/input";
import Button from "../../../../components/button";

import validateInput, {validate, focusin, focusout} from "../../../../utils/validateInput";
import validationForm from "../../../../utils/validationForm";
import { Content } from "../../types";

import styles from "./changePassword.module.scss";

interface ChangePasswordProps {
  changeContent: (content: Content) => void,
}

export default class ChangePassword extends Block {
  private password!: validate;
  private submit = false;
  private onSubmit = validationForm(this.password);

  constructor(props?: ChangePasswordProps) {
    super(props);
  }

  init() {
    this.password = validateInput("", "password");
  
    this.children.oldPassword = new Input({
      label: "Old password",
      type: "password",
      name: "old_password", 
      placeholder: "Enter old password",
      events: {},
      propStyle: styles.input  
    });
    this.children.newPassword = new Input({
      label: "New password",
      type: "password",
      name: "password", 
      placeholder: "Enter new password",
      value: this.password.value,
      events: {
        focusin: (e) => focusin(e, this),
        focusout: (e) => focusout(e, this),
      },
      propStyle: styles.input  
    });
    this.children.save = new Button({
      label: "Save",
      type: "submit",
      events: {
        click: (e) => {
          this.submit = true;
          this.onSubmit(e);
          this.setProps({password: this.password});
        }
      }, 
      propStyle: styles.btn
    });
    this.children.close = new Button({
      label: "Don't save",
      type: "button",
      events: {
        click: () => {
          this.props.changeContent(Content.Info);
        }
      }, 
      propStyle: styles.btn,
      secondary: true,
    });
  }

  render() {
    return this.compile(template, 
      {...this.props, 
      styles,
      errorPassword: this.password.error,});
  }
}
