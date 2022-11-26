import Block from "../../utils/Block";
import template from "./signin.hbs";
import Input from "../../components/input";
import Button from "../../components/button";

import validateInput, {validate} from "../../utils/validateInput";

interface SigninProps {
  styles: Record<string, string>
}

export default class Signin extends Block {
  private email!: validate;
  private password!: validate;

  constructor(props?: SigninProps) {
    super(props);
  }

  init() {
    this.email = validateInput("", "email");
    this.password = validateInput("", "password");
    this.children.email = new Input({
      label: "E-mail",
      type: "text",
      name: "email", 
      placeholder: "Enter your e-mail address",
      events: {
        focusin: () => this.email.onFocus(),
        focusout: (e) =>{
          this.email.onBlur(e);
          this.setProps(this.email);
        },
      }   
    });
    this.children.password = new Input({
      label: "Password",
      type: "password",
      name: "password", 
      placeholder: "Enter your password",
      events: {
        focusin: () => this.password.onFocus(),
        focusout: (e) =>{
          this.password.onBlur(e);
          this.setProps(this.password);
        },
      }   
    });
    this.children.button = new Button({
      label: "Sign in",
      events: {
        click: () => console.log("Sign in")
      }, 
      propStyle: this.props.styles.btn,
    });
  }

  render() {
    return this.compile(template, 
      {...this.props, 
        errorEmail: this.email.error,
        errorPassword: this.password.error,
      });
  }
}