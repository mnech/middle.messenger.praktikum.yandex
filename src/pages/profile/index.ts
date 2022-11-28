import Block from "../../utils/Block";
import template from "./profile.hbs";
import Navbar from "../../components/navbar";
import EditProfile from "./components/editProfile";
import ChangePassword from "./components/changePassword";
import Info from "./components/info";

import styles from "./profile.module.scss";

import photo from "../../../static/img/photo.png";

const data: Record<string, string> = {
  photo: "../../static/img/Photo.png",
  email: "yan@gmail.com",
  login: "yan1992",
  first_name: "Yan",
  second_name: "Petrov",
  display_name: "Yan",
  phone: "+7(911) 435 12 33",
}

enum Content {
  "info",
  "EditProfile",
  "ChangePassword"
}

interface ProfileProps {}

export default class Propfile extends Block {
  private content: Content = Content.info;

  constructor(props?: ProfileProps) {
    super(props);
  }

  private createContent() {
    if (this.content === Content.EditProfile) {
      return new EditProfile({
          email: data.email,
          login: data.login,
          first_name: data.first_name,
          second_name: data.second_name,
          display_name: data.display_name,
          phone: data.phone,  
        });
    } else if (this.content === Content.ChangePassword) {
      return new ChangePassword({});
    } else {
      return new Info({
        content,
        email: data.email,
        login: data.login,
        first_name: data.first_name,
        second_name: data.second_name,
        display_name: data.display_name,
        phone: data.phone,  
      });
    }
  }

  init() {
    this.children.navbar = new Navbar();
    this.children.content = this.createContent();
  }

  render() {
    return this.compile(template, {...this.props, styles, ...data, photo});
  }
}
