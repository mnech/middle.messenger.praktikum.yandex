import Block from "../../utils/Block";
import template from "./temp.hbs";

export default class Temp extends Block {
  render() {
    return this.compile(template, {...this.props});
  }
}
