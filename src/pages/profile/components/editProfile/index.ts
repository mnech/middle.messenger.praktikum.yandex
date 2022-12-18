import Block from "../../../../utils/Block";
import template from "./editProfile.hbs";
import Button from "../../../../components/button";
import { Content } from "../../../../types/types";

import validateInput, {validate} from "../../../../utils/validateInput";
import validationForm from "../../../../utils/validationForm";

import * as styles from "./editProfile.module.scss";
import ProfileController from "../../../../controlles/ProfileController";
import { ProfileData } from "../../../../types/interfaces";
import FormInput from "../../../../components/FormInput";
import Router from "../../../../utils/Router";

interface EditProfileProps {
  changeContent: (content: Content) => void,
  email: string,
  login: string,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
}

export default class EditProfile extends Block {
  private email!: validate;
  private login!: validate;
  private first_name!: validate;
  private second_name!: validate;
  private display_name!: validate;
  private phone!: validate;
  private onSubmit = validationForm(this.email, 
    this.login,
    this.first_name,
    this.second_name,
    this.display_name,
    this.phone);

  constructor(props?: EditProfileProps) {
    super(props);
  }

  init() {
    let {email, login, first_name, second_name, display_name, phone} = this.props;

    this.email = validateInput(email, "email");
    this.login = validateInput(login, "login");
    this.first_name = validateInput(first_name, "first_name");
    this.second_name = validateInput(second_name, "second_name");
    this.display_name = validateInput(display_name, "display_name");
    this.phone = validateInput(phone, "phone");
  
    this.children.email = new FormInput({
      label: "E-mail",
      type: "email",
      name: "email", 
      placeholder: "Enter your e-mail address",
      validation: this.email,
      propStyle: styles.input   
    });
    this.children.login = new FormInput({
      label: "Login",
      type: "text",
      name: "login", 
      placeholder: "Enter your login",
      validation: this.login,
      propStyle: styles.input  
    });
    this.children.firstName = new FormInput({
      label: "First name",
      type: "text",
      name: "first_name", 
      placeholder: "Enter your first name",
      validation: this.first_name,
      propStyle: styles.input   
    });
    this.children.secondName = new FormInput({
      label: "Second name",
      type: "text",
      name: "second_name", 
      placeholder: "Enter your second name",
      validation: this.second_name,
      propStyle: styles.input   
    });
    this.children.displayName = new FormInput({
      label: "Display name",
      type: "string",
      name: "display_name", 
      placeholder: "Enter your display name",
      validation: this.display_name,
      propStyle: styles.input   
    });
    this.children.phone = new FormInput({
      label: "Phone",
      type: "tel",
      name: "phone", 
      placeholder: "Enter your phone",
      validation: this.phone,
      propStyle: styles.input  
    });
    this.children.save = new Button({
      label: "Save",
      type: "submit",
      events: {
        click: (e) => {
          const data = this.onSubmit(e);
          ProfileController.changeProfile(data as ProfileData);
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
