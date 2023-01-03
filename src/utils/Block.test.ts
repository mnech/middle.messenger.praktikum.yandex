import { expect } from "chai";
import Block from "./Block";

describe("Block", () => {
  class Component extends Block {
    protected render(): DocumentFragment {
      return new DocumentFragment();
    }
  }

  it("test", () => {
    const instance = new Component();
      
  });
});
