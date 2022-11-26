import Block from "../../utils/Block";
import template from "./signup.hbs";
import Input from "../../components/input";
import Button from "../../components/button";
import validateInput, {validate} from "../../utils/validateInput";

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
      events: {
        focusin: () => this.email.onFocus(),
        focusout: (e) =>{
          this.email.onBlur(e);
          this.setProps(this.email);
        },
      }   
    });
    this.children.login = new Input({
      label: "Login",
      type: "text",
      name: "login", 
      placeholder: "Enter your login",
      events: {
        focusin: () => this.login.onFocus(),
        focusout: (e) =>{
          this.login.onBlur(e);
          this.setProps(this.login);
        },
      }   
    });
    this.children.firstName = new Input({
      label: "First name",
      type: "text",
      name: "first_name", 
      placeholder: "Enter your first name",
      events: {
        focusin: () => this.first_name.onFocus(),
        focusout: (e) =>{
          this.first_name.onBlur(e);
          this.setProps(this.first_name);
        },
      }   
    });
    this.children.secondName = new Input({
      label: "Second name",
      type: "text",
      name: "second_name", 
      placeholder: "Enter your second name",
      events: {
        focusin: () => this.second_name.onFocus(),
        focusout: (e) =>{
          this.second_name.onBlur(e);
          this.setProps(this.second_name);
        },
      }   
    });
    this.children.phone = new Input({
      label: "Phone",
      type: "tel",
      name: "phone", 
      placeholder: "Enter your phone",
      events: {
        focusin: () => this.phone.onFocus(),
        focusout: (e) =>{
          this.phone.onBlur(e);
          this.setProps(this.phone);
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
      label: "Sign up",
      events: {
        click: () => console.log("Sign up")
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
