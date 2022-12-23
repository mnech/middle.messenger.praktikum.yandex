import Block from "../../utils/Block";
import template from "./error404.hbs";
import Navbar from "../../components/navbar";
import Error from "../../components/error";

import img from "../../../static/img/Planet.png"

export default class Page404 extends Block {
  init() {
    this.children.navbar = new Navbar({});
    this.children.error = new Error({
      img,
      code: "404",
      text: "Hey! It looks like you are lost",
    });
  }

  render() {
    return this.compile(template);
  }
}
