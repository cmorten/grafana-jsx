import Templates from "./";

describe("Templates", () => {
  describe("when used in isolation", () => {
    describe("when passed no children", () => {
      it("should render a templating object containing an empty list", () => {
        expect(<Templates />).toMatchSnapshot();
      });
    });

    describe("when passed children", () => {
      it("should render a templating object containing a template", () => {
        expect(
          <Templates>
            <test-template test-template-prop={"test-template-value"} />
            <test-template test-template-prop={"test-template-value"} />
          </Templates>
        ).toMatchSnapshot();
      });
    });
  });

  describe("when used within another object", () => {
    describe("when passed no children", () => {
      it("should add a templating object containing an empty list to the outer object", () => {
        expect(
          <test>
            <Templates />
          </test>
        ).toMatchSnapshot();
      });
    });

    describe("when passed children", () => {
      it("should add a templating object containing a template to the outer object", () => {
        expect(
          <test>
            <Templates>
              <test-template test-template-prop={"test-template-value"} />
              <test-template test-template-prop={"test-template-value"} />
            </Templates>
          </test>
        ).toMatchSnapshot();
      });
    });
  });
});
