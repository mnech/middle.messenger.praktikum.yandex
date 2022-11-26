import Block from "../../utils/Block";
import template from "./auth.hbs";
import Signin from "../signin";
import Signup from "../signup";

import styles from "./auth.module.scss";

interface AuthProps {
  signin: boolean,
}

const dataSignin = {
  title: "Sign in",
  question: "Don’t have an account?",
  link: "",
  linkText: "Sign up",
}

const dataSignup = {
  title: "Sign up",
  question: "Already have an account?",
  link: "",
  linkText: "Sign in"
}

export default class Auth extends Block {
  constructor(props?: AuthProps) {
    super(props);
  }

  private content() {
    return this.props.signin ? dataSignin : dataSignup
  }

  init() {
    this.children.form = this.props.signin ? new Signin({styles}) : new Signup({styles});
  }

  render() {
    return this.compile(template, 
      {...this.props, 
        styles,
        ...this.content(),
      });
  }
}
