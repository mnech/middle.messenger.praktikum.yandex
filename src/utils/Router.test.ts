import Router from "./Router";

window.history.forward = () => {};

describe("Router", () => {
  beforeEach(() => {
    Router.reset();
  });

  it("forward", () => {
    Router.forward();
  });

  it("back", () => {
    
  });
});
