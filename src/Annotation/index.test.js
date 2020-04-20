import Annotation from "./";

const withAllProps = {
  builtIn: 0,
  datasource: "test-datasource",
  enable: false,
  hide: false,
  iconColor: "test-colour",
  name: "test-name",
  type: "test-type",
};

describe("Annotation", () => {
  describe("when passed no props", () => {
    it("should render a default Annotation", () => {
      expect(<Annotation />).toMatchSnapshot();
    });
  });

  describe("when passed all props", () => {
    it("should render a custom Annotation", () => {
      expect(<Annotation {...withAllProps} />).toMatchSnapshot();
    });
  });

  describe("when passed additional props", () => {
    it("should render a custom Annotation with the additional props", () => {
      expect(
        <Annotation
          {...withAllProps}
          test-annotation-prop={Symbol("test-annotation-value")}
        />
      ).toMatchSnapshot();
    });
  });
});
