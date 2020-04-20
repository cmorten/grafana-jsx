import Annotations from "./";

describe("Annotations", () => {
  describe("when used in isolation", () => {
    describe("when passed no children", () => {
      it("should render an annotations object containing an empty list", () => {
        expect(<Annotations />).toMatchSnapshot();
      });
    });

    describe("when passed children", () => {
      it("should render an annotations object containing an annotation", () => {
        expect(
          <Annotations>
            <test-annotation test-annotation-prop={"test-annotation-value"} />
          </Annotations>
        ).toMatchSnapshot();
      });
    });
  });

  describe("when used within another object", () => {
    describe("when passed no children", () => {
      it("should add an annotations object containing an empty list to the outer object", () => {
        expect(
          <test>
            <Annotations />
          </test>
        ).toMatchSnapshot();
      });
    });

    describe("when passed children", () => {
      it("should add an annotations object containing an annotation to the outer object", () => {
        expect(
          <test>
            <Annotations>
              <test-annotation test-annotation-prop={"test-annotation-value"} />
            </Annotations>
          </test>
        ).toMatchSnapshot();
      });
    });
  });
});
