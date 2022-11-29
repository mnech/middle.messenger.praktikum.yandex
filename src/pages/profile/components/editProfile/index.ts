import Block from "../../../../utils/Block";
import template from "./editProfile.hbs";
import Input from "../../../../components/input";
import Button from "../../../../components/button";
import { Content } from "../../types";

import validateInput, {validate} from "../../../../utils/validateInput";
import validationForm from "../../../../utils/validationForm";

import * as styles from "./editProfile.module.scss";

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
  private submit = false;
  private onSubmit = validationForm(this.email, 
    this.login,
    this.first_name,
    this.second_name,
    this.display_name,
    this.phone);

  constructor(props?: EditProfileProps) {
    super(props);
  }

  private focusin(e: Event) {
    const self: Record<string, any> = this;
    const name = (e.target as HTMLInputElement).name;
    self[name].onFocus();
  }

  private focusout(e: Event) {
    const self: Record<string, any> = this;
    const name = (e.target as HTMLInputElement).name;
    self[name].onBlur(e);

    //after submit don't need to update props
    if (this.submit) {
      this.submit = false;
      return;
    } 

    this.setProps({name: self[name]});
  }

  init() {
    this.email = validateInput(this.props.email, "email");
    this.login = validateInput(this.props.login, "login");
    this.first_name = validateInput(this.props.first_name, "first_name");
    this.second_name = validateInput(this.props.second_name, "second_name");
    this.display_name = validateInput(this.props.display_name, "display_name");
    this.phone = validateInput(this.props.phone, "phone");
  
    this.children.email = new Input({
      label: "E-mail",
      type: "email",
      name: "email", 
      placeholder: "Enter your e-mail address",
      value: this.email.value,
      events: {
        focusin: (e) => this.focusin(e),
        focusout: (e) => this.focusout(e),
      },
      propStyle: styles.input   
    });
    this.children.login = new Input({
      label: "Login",
      type: "text",
      name: "login", 
      placeholder: "Enter your login",
      value: this.login.value,
      events: {
        focusin: (e) => this.focusin(e),
        focusout: (e) => this.focusout(e),
      },
      propStyle: styles.input  
    });
    this.children.firstName = new Input({
      label: "First name",
      type: "text",
      name: "first_name", 
      placeholder: "Enter your first name",
      value: this.first_name.value,
      events: {
        focusin: (e) => this.focusin(e),
        focusout: (e) => this.focusout(e),
      },
      propStyle: styles.input   
    });
    this.children.secondName = new Input({
      label: "Second name",
      type: "text",
      name: "second_name", 
      placeholder: "Enter your second name",
      value: this.second_name.value,
      events: {
        focusin: (e) => this.focusin(e),
        focusout: (e) => this.focusout(e),
      },
      propStyle: styles.input   
    });
    this.children.displayName = new Input({
      label: "Display name",
      type: "string",
      name: "display_name", 
      placeholder: "Enter your display name",
      value: this.display_name.value,
      events: {
        focusin: (e) => this.focusin(e),
        focusout: (e) => this.focusout(e),
      },
      propStyle: styles.input   
    });
    this.children.phone = new Input({
      label: "Phone",
      type: "tel",
      name: "phone", 
      placeholder: "Enter your phone",
      value: this.phone.value,
      events: {
        focusin: (e) => this.focusin(e),
        focusout: (e) => this.focusout(e),
      },
      propStyle: styles.input  
    });
    this.children.save = new Button({
      label: "Save",
      type: "submit",
      events: {
        click: (e) => {
          this.onSubmit(e);
          this.setProps({
            email: this.email,
            login: this.login,
            first_name: this.first_name,
            second_name: this.second_name,
            display_name: this.display_name,
            phone: this.phone
          });
        }
      }, 
      propStyle: styles.btn
    });
    this.children.close = new Button({
      label: "Don't save",
      type: "button",
      events: {
        click: () => {
          this.submit = true;
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
      errorEmail: this.email.error,
      errorLogin: this.login.error,
      errorFirstName: this.first_name.error,
      errorSecondName: this.second_name.error,
      errorPhone: this.phone.error,
      errorDisplayName: this.display_name.error,});
  }
}
