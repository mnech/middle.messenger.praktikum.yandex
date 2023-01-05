import proxyquire from "proxyquire";
import Sinon from "sinon";
import { expect } from "chai";

describe("LoginPage", () => {
  const siginFake = Sinon.fake();

  const { Auth } = proxyquire("./index", {
    "../../controllers/AuthController": {
      signin: siginFake,
      '@noCallThru': true
    }
  });

  it("should call AuthController.signin on button click", () => {
    const page = new Auth({signin: true});
    const element = page.element;
    const button = element?.querySelector("button");

    button?.click();

    expect(siginFake.callCount);
  });
});
