import Block from "./Block";
import Handlebars from "handlebars";

import { getStub } from "./stub";

export function registerComponent(name: string, Component: typeof Block) {
  Handlebars.registerHelper(name, function({data, fn, hash}) {
    const component = new Component(hash);

    if (!data.root.children) {
      data.root.children = {};
    }

    data.root.children[component.id] = component;

    const contents = fn ? fn(this) : "";

    return getStub(component.id, contents);
  });
}
