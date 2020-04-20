import Template from "./";

const withAllProps = {
  allFormat: "test-all-format",
  allValue: "test-all-value",
  current: {
    selected: true,
    text: "test-current-text",
    value: "test-current-value",
  },
  datasource: "test-datasource",
  definition: "test-definition",
  hide: 0,
  includeAll: true,
  label: "test-label",
  multi: true,
  multiFormat: "test-multi-format",
  name: "test-name",
  options: ["test-option-1", "test-option-2"],
  query: "test-query",
  refresh: 0,
  regex: "test-regex",
  skipUrlSync: true,
  sort: 0,
  tagValuesQuery: "test-tag-values-query",
  tags: ["test-tag-1", "test-tag-2"],
  tagsQuery: "test-tags-query",
  type: "test-type",
  useTags: true,
};

describe("Template", () => {
  describe("when passed no props", () => {
    it("should render a default Template", () => {
      expect(<Template />).toMatchSnapshot();
    });
  });

  describe("when passed all props", () => {
    it("should render a custom Template", () => {
      expect(<Template {...withAllProps} />).toMatchSnapshot();
    });
  });

  describe("when passed additional props", () => {
    it("should render a custom Template with the additional props", () => {
      expect(
        <Template
          {...withAllProps}
          test-template-prop={"test-template-value"}
        />
      ).toMatchSnapshot();
    });
  });
});
