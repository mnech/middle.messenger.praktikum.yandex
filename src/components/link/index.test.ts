import { expect } from "chai";
import { BaseLink as Link } from ".";
import Sinon from "sinon";

describe("Link", () => {
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      go: Sinon.fake()
    }
  });

  it('should render', () => {
    const path = "/test";
    new Link({
    label: "Click",
    to: path,
    router: routerMock as any
    });
  });

  it("should call Router.go on click", () => {
    const path = "/test";
    const instance = new Link({
      label: "Click",
      to: path,
      router: routerMock as any,
    });

    const element = instance.element;

    element?.click();

    expect(routerMock.go.callCount).to.eq(1);
  });

  it("should call Router.go on click with link href", () => {
    const path = "/test";
    const instance = new Link({
      label: "Click",
      to: path,
      router: routerMock as any,
    });

    const element = instance.element;

    element?.click();

    expect(routerMock.go.lastArg).to.eq(path);
  });
});
