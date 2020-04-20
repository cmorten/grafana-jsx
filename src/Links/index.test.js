import Links from "./";

describe("Links", () => {
  describe("when passed no Link children", () => {
    it("should render", () => {
      expect(<Links />).toMatchSnapshot();
    });
  });

  describe("when passed Link children", () => {
    it("should render", () => {
      expect(
        <Links>
          <test-link test-link-prop={Symbol("test-link-value")} />
          <test-link test-link-prop={Symbol("test-link-value")} />
        </Links>
      ).toMatchSnapshot();
    });
  });
});
