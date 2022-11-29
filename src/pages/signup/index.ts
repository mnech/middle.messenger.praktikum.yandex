import Block from "../../utils/Block";
import template from "./signup.hbs";
import Input from "../../components/input";
import Button from "../../components/button";

import validateInput, {validate, focusin, focusout} from "../../utils/validateInput";
import validationForm from "../../utils/validationForm";

interface SignupProps {
  styles: Record<string, string>
}

export default class Signup extends Block {
  private email!: validate;
  private login!: validate;
  private first_name!: validate;
  private second_name!: validate;
  private phone!: validate;
  private password!: validate;
  private submit = false;
  private onSubmit = validationForm(this.email, 
    this.login,
    this.first_name,
    this.second_name,
    this.phone,
    this.password);

  constructor(props?: SignupProps) {
    super(props);
  }
  
  init() {
    this.email = validateInput("", "email");
    this.login = validateInput("", "login");
    this.first_name = validateInput("", "first_name");
    this.second_name = validateInput("", "second_name");
    this.phone = validateInput("", "phone");
    this.password = validateInput("", "password");

    this.children.email = new Input({
      label: "E-mail",
      type: "email",
      name: "email", 
      placeholder: "Enter your e-mail address",
      value: this.email.value,
      events: {
        focusin: (e) => focusin(e, this),
        focusout: (e) => focusout(e, this),
      }   
    });
    this.children.login = new Input({
      label: "Login",
      type: "text",
      name: "login", 
      placeholder: "Enter your login",
      value: this.login.value,
      events: {
        focusin: (e) => focusin(e, this),
        focusout: (e) => focusout(e, this),
      }   
    });
    this.children.firstName = new Input({
      label: "First name",
      type: "text",
      name: "first_name", 
      placeholder: "Enter your first name",
      value: this.first_name.value,
      events: {
        focusin: (e) => focusin(e, this),
        focusout: (e) => focusout(e, this),
      }   
    });
    this.children.secondName = new Input({
      label: "Second name",
      type: "text",
      name: "second_name", 
      placeholder: "Enter your second name",
      value: this.second_name.value,
      events: {
        focusin: (e) => focusin(e, this),
        focusout: (e) => focusout(e, this),
      }   
    });
    this.children.phone = new Input({
      label: "Phone",
      type: "tel",
      name: "phone", 
      placeholder: "Enter your phone",
      value: this.phone.value,
      events: {
        focusin: (e) => focusin(e, this),
        focusout: (e) => focusout(e, this),
      }   
    });
    this.children.password = new Input({
      label: "Password",
      type: "password",
      name: "password", 
      placeholder: "Enter your password",
      value: this.password.value,
      events: {
        focusin: (e) => focusin(e, this),
        focusout: (e) => focusout(e, this),
      }   
    });
    this.children.button = new Button({
      label: "Sign up",
      events: {
        click: (e) => {
          this.submit = true;
          this.onSubmit(e);
          this.setProps({
            email: this.email,
            login: this.login,
            first_name: this.first_name,
            second_name: this.second_name,
            phone: this.phone,
            password: this.password
          });
        }
      }, 
      propStyle: this.props.styles.btn,
    });
  }

  render() {
    return this.compile(template, 
      {...this.props,
      errorEmail: this.email.error,
      errorLogin: this.login.error,
      errorFirstName: this.first_name.error,
      errorSecondName: this.second_name.error,
      errorPhone: this.phone.error,
      errorPassword: this.password.error,
    });
  }
}
