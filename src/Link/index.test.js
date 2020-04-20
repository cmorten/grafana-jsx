import Link from "./";

const withAllProps = {
  icon: "test-icon",
  tags: ["test-tag-1", "test-tag-2"],
  type: "test-type",
};

describe("Link", () => {
  describe("when passed no props", () => {
    it("should render a link with defaults", () => {
      expect(<Link />).toMatchSnapshot();
    });
  });

  describe("when passed all props", () => {
    it("should render a custom link", () => {
      expect(<Link {...withAllProps} />).toMatchSnapshot();
    });
  });

  describe("when passed custom props", () => {
    it("should render a custom link with the custom props", () => {
      expect(
        <Link {...withAllProps} test-link-prop={Symbol("test-link-value")} />
      ).toMatchSnapshot();
    });
  });
});
