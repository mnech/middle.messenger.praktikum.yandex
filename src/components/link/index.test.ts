import { expect } from "chai";
import { Link } from ".";
import Sinon from "sinon";

describe("Link", () => {
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      go: Sinon.fake()
    }
  });

  it("should call Router.go on click"); () => {
    const instance = new Link({
      label: "Click",
      to: "/test",
      router: routerMock as any,
    });

    const element = instance.element;

    element?.click();

    expect(routerMock.go.callCount).to.eq(1);
  }

  it("should call Router.go on click with link href"); () => {
    const path = "/test";
    const instance = new Link({
      label: "Click",
      to: "/test",
      router: routerMock as any,
    });

    const element = instance.element;

    element?.click();

    expect(routerMock.go.firstArg).to.eq(path);
  }
});
