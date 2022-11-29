import Block from "../../utils/Block";
import template from "./profile.hbs";
import Navbar from "../../components/navbar";
import EditProfile from "./components/editProfile";
import ChangePassword from "./components/changePassword";
import Info from "./components/info";
import { Content } from "./types";

import * as styles from "./profile.module.scss";

import photo from "../../../static/img/Photo.png";

const data: Record<string, string> = {
  photo: "../../static/img/Photo.png",
  email: "yan@gmail.com",
  login: "yan1992",
  first_name: "Yan",
  second_name: "Petrov",
  display_name: "Yan",
  phone: "+79114351233",
}

interface ProfileProps {}

export default class Profile extends Block {
  private content: Content = Content.Info;

  constructor(props?: ProfileProps) {
    super(props);
  }

  private changeContent() {
    return (content: Content) => {
      this.content = content;
      this.setProps({content: this.content});
    }
  }

  private createContent() {
    this.changeContent.bind(this);

    if (this.content === Content.EditProfile) {
      return new EditProfile({
          changeContent: this.changeContent(),
          email: data.email,
          login: data.login,
          first_name: data.first_name,
          second_name: data.second_name,
          display_name: data.display_name,
          phone: data.phone,  
        });
    } else if (this.content === Content.ChangePassword) {
      return new ChangePassword({
        changeContent: this.changeContent(),
      });
    } else {
      return new Info({
        changeContent: this.changeContent(),
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
  }

  render() {
    this.children.content = this.createContent();
    return this.compile(template, {...this.props, styles, ...data, photo});
  }
}
