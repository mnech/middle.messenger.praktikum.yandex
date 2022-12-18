import Block from "../../../../utils/Block";
import template from "./changePassword.hbs";
import Button from "../../../../components/button";

import validateInput, {validate, validEvents} from "../../../../utils/validateInput";
import validationForm from "../../../../utils/validationForm";

import * as styles from "./changePassword.module.scss";
import ProfileController from "../../../../controlles/ProfileController";
import { PasswordData } from "../../../../types/interfaces";
import FormInput from "../../../../components/FormInput";
import Router from "../../../../utils/Router";

interface ChangePasswordProps {}

export default class ChangePassword extends Block {
  private oldPassword!: validate;
  private password!: validate;
  private onSubmit = validationForm(this.oldPassword, this.password);

  constructor(props?: ChangePasswordProps) {
    super(props);
  }

  init() {
    this.oldPassword = validateInput("", "oldPassword");
    this.password = validateInput("", "password");
  
    this.children.oldPassword = new FormInput({
      label: "Old password",
      type: "password",
      name: "oldPassword", 
      placeholder: "Enter old password",
      validation: this.oldPassword,
      propStyle: styles.input  
    });
    this.children.newPassword = new FormInput({
      label: "New password",
      type: "password",
      name: "password", 
      placeholder: "Enter new password",
      validation: this.password,
      propStyle: styles.input  
    });
    this.children.save = new Button({
      label: "Save",
      type: "submit",
      events: {
        click: (e) => {
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
      label: "Close",
      type: "button",
      events: {
        click: () => {
          Router.go("/settings");
        }
      }, 
      propStyle: styles.btn,
      secondary: true,
    });
  }

  render() {
    return this.compile(template, 
      {...this.props, 
      styles});
  }
}
