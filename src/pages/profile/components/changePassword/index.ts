import Block from "../../../../utils/Block";
import template from "./changePassword.hbs";
import Input from "../../../../components/input";
import Button from "../../../../components/button";

import validateInput, {validate} from "../../../../utils/validateInput";
import validationForm from "../../../../utils/validationForm";

import styles from "./changePassword.module.scss";

interface ChangePasswordProps {}

export default class ChangePassword extends Block {
  private password!: validate;

  constructor(props?: ChangePasswordProps) {
    super(props);
  }

  onSubmit = validationForm(this.password);

  init() {
    this.password = validateInput("", "password");
  
    this.children.oldPassword = new Input({
      label: "Old password",
      type: "password",
      name: "old_password", 
      placeholder: "Enter old password",
      events: {},
      propStyle: styles.input  
    });
    this.children.newPassword = new Input({
      label: "New password",
      type: "password",
      name: "password", 
      placeholder: "Enter new password",
      value: this.password.value,
      events: {
        focusin: () => this.password.onFocus(),
        focusout: (e) =>{
          this.password.onBlur(e);
          this.setProps(this.password);
        },
      },
      propStyle: styles.input  
    });
    this.children.save = new Button({
      label: "Save",
      events: {
        click: (e) => {
          this.onSubmit(e);
          this.setProps(this);
        }
      }, 
      propStyle: styles.save
    });
  }

  render() {
    return this.compile(template, 
      {...this.props, 
      styles,
      errorPassword: this.password.error,});
  }
}
