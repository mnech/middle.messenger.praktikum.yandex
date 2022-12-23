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
import Store from "../../../../utils/Store";
import ErrorText from "../../../../components/errorText";

interface ChangePasswordProps {}

export default class ChangePassword extends Block {
  private oldPassword!: validate;
  private password!: validate;
  private onSubmit = validationForm(this.oldPassword, this.password);

  constructor(props?: ChangePasswordProps) {
    super(props);
  }

  async changePassword(e: Event) {
    this.onSubmit(e);
          
    if (this.oldPassword.value && this.password.value) {
      const data = {
        oldPassword: this.oldPassword.value,
        newPassword: this.password.value,
       };

      await ProfileController.changePassword(data as PasswordData);

      const error = Store.getState().userError;

      if (error) {
        (this.children.error as Block).setProps({error});
      } else {
        this.oldPassword.value = "";
        this.password.value = "";

        (this.children.oldPassword as Block).setProps({validation: this.oldPassword});
        (this.children.newPassword as Block).setProps({validation: this.password});
        
        (this.children.error as Block).setProps({error: ""});
      }
    }   
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
          e.preventDefault();
          this.changePassword(e);
        }, 
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
    this.children.error = new ErrorText({});
  }

  render() {
    console.log(this.props)
    return this.compile(template, {...this.props, styles});
  }
}
