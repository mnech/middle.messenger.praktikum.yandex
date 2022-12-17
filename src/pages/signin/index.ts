import Block from "../../utils/Block";
import template from "./signin.hbs";
import Input from "../../components/input";
import Button from "../../components/button";

import validateInput, {validate, validEvents} from "../../utils/validateInput";
import validationForm from "../../utils/validationForm";
import AuthController from "../../controlles/AuthController";
import { SigninData } from "../../types/interfaces";

interface SigninProps {
  styles: Record<string, string>
}

export default class Signin extends Block {
  private login!: validate;
  private password!: validate;
  private submit = false;
  private onSubmit = validationForm(this.login, this.password);

  constructor(props?: SigninProps) {
    super(props);
  }

  init() {
    this.login = validateInput("", "login");
    this.password = validateInput("", "password");

    this.children.login = new Input({
      label: "Login",
      type: "text",
      name: "login", 
      placeholder: "Enter your login",
      value: this.login.value,
      events: validEvents(this),  
    });
    this.children.password = new Input({
      label: "Password",
      type: "password",
      name: "password", 
      placeholder: "Enter your password",
      value: this.password.value,
      events: validEvents(this),   
    });
    this.children.button = new Button({
      label: "Sign in",
      type: "submit",
      events: {
        click: (e: PointerEvent) => {
          this.submit = true;
          
          this.setProps({
            email: this.login,
            password: this.password,
          }); 
          
          const data = this.onSubmit(e);
          AuthController.signin(data as SigninData);
        }
      }, 
      propStyle: this.props.styles.btn,
    });
  }

  render() {
    return this.compile(template, 
      {...this.props, 
        errorLogin: this.login.error,
        errorPassword: this.password.error,
      });
  }
}
