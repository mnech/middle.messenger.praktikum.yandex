import Block from "../../utils/Block";
import template from "./signup.hbs";
import Input from "../../components/input";
import Button from "../../components/button";

import styles from "./signup.module.scss";

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
    this.children.login = new Input({
      label: "Login",
      type: "text",
      name: "login", 
      placeholder: "Enter your login",
      errorText: "Please enter your login.",
      events: {
        click: () => console.log("input")
      }   
    });
    this.children.login = new Input({
      label: "First name",
      type: "text",
      name: "first_name", 
      placeholder: "Enter your first name",
      errorText: "Please enter your first name.",
      events: {
        click: () => console.log("input")
      }   
    });
    this.children.login = new Input({
      label: "Second name",
      type: "text",
      name: "second_name", 
      placeholder: "Enter your second name",
      errorText: "Please enter your second name.",
      events: {
        click: () => console.log("input")
      }   
    });
    this.children.login = new Input({
      label: "Phone",
      type: "tel",
      name: "phone", 
      placeholder: "Enter your phone",
      errorText: "Please enter your phone.",
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
      label: "Sign up",
      events: {
        click: () => console.log("Sign up")
      }, 
      propStyle: styles.btn,
    });
  }

  render() {
    return this.compile(template, 
      {...this.props, 
        styles,
        title: "Sign up",
        question: "Already have an account?",
        link: "",
        linkText: "Sign in"
      });
  }
}
