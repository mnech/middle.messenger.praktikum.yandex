import Block from "../../../utils/Block";
import template from "./uploadInput.hbs";

interface UploadInputProps {
  events: {
    input: (e: Event) => void,
  },
  styles: Record<string, string>
}

export default class UploadInput extends Block {

  constructor(props?: UploadInputProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props});
  }
}
