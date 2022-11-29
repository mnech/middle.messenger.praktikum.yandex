import Block from "../../utils/Block";
import template from "./signin.hbs";
import Input from "../../components/input";
import Button from "../../components/button";

import validateInput, {validate, focusin, focusout} from "../../utils/validateInput";
import validationForm from "../../utils/validationForm";

interface SigninProps {
  styles: Record<string, string>
}

export default class Signin extends Block {
  private email!: validate;
  private password!: validate;
  private submit = false;
  private onSubmit = validationForm(this.email, this.password);

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
      value: this.email.value,
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
      label: "Sign in",
      type: "submit",
      events: {
        click: (e: PointerEvent) => {
          this.submit = true;
          this.onSubmit(e);
          this.setProps({
            email: this.email,
            password: this.password,
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
        errorPassword: this.password.error,
      });
  }
}
