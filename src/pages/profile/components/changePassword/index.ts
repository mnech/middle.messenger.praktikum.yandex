import Block from "../../../../utils/Block";
import template from "./changePassword.hbs";
import Input from "../../../../components/input";
import Button from "../../../../components/button";

import validateInput, {validate, validEvents} from "../../../../utils/validateInput";
import validationForm from "../../../../utils/validationForm";
import { Content } from "../../../../types/types";

import * as styles from "./changePassword.module.scss";
import ProfileController from "../../../../controlles/ProfileController";
import { PasswordData } from "../../../../types/interfaces";

interface ChangePasswordProps {
  changeContent: (content: Content) => void,
}

export default class ChangePassword extends Block {
  private oldPassword!: validate;
  private password!: validate;
  private submit = false;
  private onSubmit = validationForm(this.oldPassword, this.password);

  constructor(props?: ChangePasswordProps) {
    super(props);
  }

  init() {
    this.oldPassword = validateInput("", "oldPassword");
    this.password = validateInput("", "password");
  
    this.children.oldPassword = new Input({
      label: "Old password",
      type: "password",
      name: "oldPassword", 
      placeholder: "Enter old password",
      value: this.oldPassword.value,
      events: validEvents(this),
      propStyle: styles.input  
    });
    this.children.newPassword = new Input({
      label: "New password",
      type: "password",
      name: "password", 
      placeholder: "Enter new password",
      value: this.password.value,
      events: validEvents(this),
      propStyle: styles.input  
    });
    this.children.save = new Button({
      label: "Save",
      type: "submit",
      events: {
        click: (e) => {
          this.submit = true;

          this.setProps({
            password: this.password, 
            oldPassword: this.oldPassword
          });

          this.onSubmit(e);
          const data = {
            oldPassword: this.oldPassword.value,
            newPassword: this.password.value,
          };
          ProfileController.changePassword(data as PasswordData);
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
      errorOldPassword: this.oldPassword.error,
      errorPassword: this.password.error,});
  }
}
