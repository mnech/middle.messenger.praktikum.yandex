import Block from "../../utils/Block";
import template from "./signin.hbs";
import Button from "../../components/button";

import validateInput, {validate} from "../../utils/validateInput";
import validationForm from "../../utils/validationForm";
import AuthController from "../../controlles/AuthController";
import { SigninData } from "../../types/interfaces";
import FormInput from "../../components/FormInput";
import ErrorText from "../../components/errorText";
import Store from "../../utils/Store";

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

  async auth(e: Event) {
    const data = this.onSubmit(e);

    if (data) { 
      await AuthController.signin(data as SigninData);

      const error = Store.getState().errorAuth;

      if (error) {
        (this.children.error as Block).setProps({error});
      }
    }
  }

  init() {
    this.login = validateInput("", "login");
    this.password = validateInput("", "password");

    this.children.login = new FormInput({
      label: "Login",
      type: "text",
      name: "login",
      placeholder: "Enter your login",
      validation: this.login, 
    });
    this.children.password = new FormInput({
      label: "Password",
      type: "password",
      name: "password", 
      placeholder: "Enter your password",
      validation: this.password,   
    });
    this.children.button = new Button({
      label: "Sign in",
      type: "submit",
      events: {
        click: (e: PointerEvent) => {
          this.auth(e);
        }
      }, 
      propStyle: this.props.styles.btn,
    });
    this.children.error = new ErrorText({});
  }

  render() {
    return this.compile(template, 
      {...this.props});
  }
}
