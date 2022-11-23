import Block from "../../utils/Block";
import template from "./signin.hbs";
import Input from "../../components/input";
import Button from "../../components/button";

import styles from "./signin.module.scss";

interface SigninProps {}

export default class Signin extends Block {
  constructor(props?: SigninProps) {
    super(props);
  }

  init() {
    this.children.email = new Input({
      label: "E-mail",
      type: "email",
      name: "email", 
      placeholder: "Enter your e-mail address",
      errorText: "Please enter your e-mail.",
      events: {
        click: () => console.log("input")
      }   
    });
    this.children.password = new Input({
      label: "Password",
      type: "password",
      name: "password", 
      placeholder: "Enter your password",
      errorText: "Please enter your password.",
      events: {
        click: () => console.log("input")
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
        linkText: "Sign up"
      });
  }
}
