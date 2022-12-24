import Block from "../../utils/Block";
import template from "./uploadFile.hbs";
import UploadInput from "./uploadInput";
import * as styles from "./uploadFile.module.scss";

interface UploadFileProps {
  photo: "string",
  events: {
    req: (data: FormData) => void,
  },
}

export default class UploadFile extends Block {

  constructor(props?: UploadFileProps) {
    super(props);
  }

  async changePhoto(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files?.length) {
      const formData = new FormData();
      formData.append("avatar", files.item(0)!);
      this.props.events.req(formData); 
    }
  }

  init() {
    this.children.upload = new UploadInput({
      events: {
        input: (e: Event) => {
          this.changePhoto(e);
        }
      },
      styles
    });
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
