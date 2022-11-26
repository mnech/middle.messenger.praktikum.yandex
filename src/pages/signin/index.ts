import Block from "../../utils/Block";
import template from "./signin.hbs";
import Input from "../../components/input";
import Button from "../../components/button";

import styles from "./signin.module.scss";
import validateInput from "../../utils/validateInput";

interface SigninProps {}

export default class Signin extends Block {
  private email;
  private password;

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
      propStyle: styles.btn,
    });
  }

  render() {
    return this.compile(template, 
      {...this.props, 
        styles,
        title: "Sign in",
        question: "Don’t have an account?",
        link: "",
        linkText: "Sign up",
        errorEmail: this.email.error,
        errorPassword: this.password.error,
      });
  }
}
