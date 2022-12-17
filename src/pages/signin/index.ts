import Block from "../../utils/Block";
import template from "./signin.hbs";
import Button from "../../components/button";

import validateInput, {validate} from "../../utils/validateInput";
import validationForm from "../../utils/validationForm";
import AuthController from "../../controlles/AuthController";
import { SigninData } from "../../types/interfaces";
import FormInput from "../../components/FormInput";

interface SigninProps {
  styles: Record<string, string>
}

export default class Signin extends Block {
  private login!: validate;
  private password!: validate;
  private onSubmit = validationForm(this.login, this.password);

  constructor(props?: SigninProps) {
    super(props);
  }

  init() {
    this.login = validateInput("", "login");
    this.password = validateInput("", "password");

    this.children.login = new FormInput({
      label: "Login",
      type: "text",
      name: "login", 
      value: "",
      placeholder: "Enter your login",
      validation: "login", 
    });
    this.children.password = new FormInput({
      label: "Password",
      type: "password",
      name: "password", 
      value: "",
      placeholder: "Enter your password",
      validation: "password",   
    });
    this.children.button = new Button({
      label: "Sign in",
      type: "submit",
      events: {
        click: (e: PointerEvent) => {
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
      {...this.props});
  }
}
