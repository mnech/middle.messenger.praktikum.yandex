import Block from "../../utils/Block";
import validateInput, { validate, validEvents } from "../../utils/validateInput";
import ErrorInput from "../ErrorInput";
import Input from "../input";
import template from "./formInput.hbs";
import * as styles from "./formInput.module.scss";

interface FormInputProps {
  label?: string,
  type: string,
  name: string, 
  value: string,
  placeholder: string,
  validation: string,
  propStyle?: string,
}

export default class FormInput extends Block {
  private input!: validate;

  constructor(props: FormInputProps) {
    super(props);
  }

  init() {
    this.input = validateInput(this.props.value, this.props.validation);

    this.children.error = new ErrorInput({
      text: "",
    });
    this.children.input = new Input({
      label: this.props.label,
      type: this.props.type,
      name: this.props.name, 
      placeholder: this.props.placeholder,
      value: this.input.value,
      events: validEvents(this.input, this.children.error),  
    });
    
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
