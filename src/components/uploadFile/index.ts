import Block from "../../utils/Block";
import template from "./uploadFile.hbs";
import UploadInput from "./uploadInput";
import * as styles from "./uploadFile.module.scss";
import ProfileController from "../../controlles/ProfileController";
import AuthController from "../../controlles/AuthController";

interface UploadFileProps {
  photo: "string"
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
      await ProfileController.changeAvatar(formData);
      
      await AuthController.fetchUser();   
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
