import Block from "../../utils/Block";
import template from "./profile.hbs";
import Navbar from "../../components/navbar";

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

interface ProfileProps {}

export default class Propfile extends Block {
  constructor(props?: ProfileProps) {
    super(props);
  }

  init() {
    this.children.navbar = new Navbar();
  }

  render() {
    return this.compile(template, {...this.props, styles,...data, photo});
  }
}

// ---
// photo: "../../static/img/Photo.png"
// email: "yan@gmail.com"
// login: "yan1992"
// first_name: "Yan"
// second_name: "Petrov"
// display_name: "Yan"
// phone: "+7(911) 435 12 33"
// ---
