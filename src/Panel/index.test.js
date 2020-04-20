import Panel from "./";

const requiredProps = {
  type: "test-type",
  x: 0,
  y: 0,
};

const withAllProps = {
  ...requiredProps,
  width: 24,
  height: 18,
};

describe("Panel", () => {
  describe("when passed required props", () => {
    it("should render a default panel with required props", () => {
      expect(<Panel {...requiredProps} />).toMatchSnapshot();
    });
  });

  describe("when passed all props", () => {
    it("should render a custom panel", () => {
      expect(<Panel {...withAllProps} />).toMatchSnapshot();
    });
  });

  describe("when passed custom props", () => {
    it("should render a custom panel with the custom props", () => {
      expect(
        <Panel {...withAllProps} test-panel-prop={Symbol("test-panel-value")} />
      ).toMatchSnapshot();
    });
  });
});
