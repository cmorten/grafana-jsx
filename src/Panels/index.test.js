import Panels from "./";

describe("Panels", () => {
  describe("when passed no Panel children", () => {
    it("should render", () => {
      expect(<Panels />).toMatchSnapshot();
    });
  });

  describe("when passed Panel children", () => {
    it("should render", () => {
      expect(
        <Panels>
          <test-panel test-panel-prop={Symbol("test-panel-value")} />
          <test-panel test-panel-prop={Symbol("test-panel-value")} />
        </Panels>
      ).toMatchSnapshot();
    });
  });
});
