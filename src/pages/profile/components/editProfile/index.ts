import Block from "../../../../utils/Block";
import template from "./editProfile.hbs";
import Input from "../../../../components/input";
import Button from "../../../../components/button";
import { Content } from "../../types";

import validateInput, {validate} from "../../../../utils/validateInput";
import validationForm from "../../../../utils/validationForm";

import styles from "./editProfile.module.scss";

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

  constructor(props?: EditProfileProps) {
    super(props);
  }

  onSubmit = validationForm(this.email, 
                            this.login,
                            this.first_name,
                            this.second_name,
                            this.display_name,
                            this.phone);

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
        focusin: () => this.email.onFocus(),
        focusout: (e) =>{
          this.email.onBlur(e);
          this.setProps(this.email);
        },
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
        focusin: () => this.login.onFocus(),
        focusout: (e) =>{
          this.login.onBlur(e);
          this.setProps(this.login);
        },
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
        focusin: () => this.first_name.onFocus(),
        focusout: (e) =>{
          this.first_name.onBlur(e);
          this.setProps(this.first_name);
        },
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
        focusin: () => this.second_name.onFocus(),
        focusout: (e) =>{
          this.second_name.onBlur(e);
          this.setProps(this.second_name);
        },
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
        focusin: () => this.display_name.onFocus(),
        focusout: (e) =>{
          this.display_name.onBlur(e);
          this.setProps(this.display_name);
        },
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
        focusin: () => this.phone.onFocus(),
        focusout: (e) =>{
          this.phone.onBlur(e);
          this.setProps(this.phone);
        },
      },
      propStyle: styles.input  
    });
    this.children.save = new Button({
      label: "Save",
      type: "submit",
      events: {
        click: (e) => {
          this.onSubmit(e);
          this.setProps(this);
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
      errorEmail: this.email.error,
      errorLogin: this.login.error,
      errorFirstName: this.first_name.error,
      errorSecondName: this.second_name.error,
      errorPhone: this.phone.error,
      errorDisplayName: this.display_name.error,});
  }
}
