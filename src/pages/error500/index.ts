import Block from "../../utils/Block";
import template from "./error500.hbs";
import Navbar from "../../components/navbar";
import Error from "../../components/error";

import img from "../../../static/img/UFO.png"

export default class Page500 extends Block {
  init() {
    this.children.navbar = new Navbar({});
    this.children.error = new Error({
      img,
      code: "500",
      text: "Woops! Looks like something went wrong",
    });
  }

  render() {
    return this.compile(template);
  }
}
