import Dashboard from "./";

jest.mock("../Annotation", () => () => <test-annotation />);
jest.mock("../Annotations", () => ({ children }) => (
  <test-annotations>{children}</test-annotations>
));
jest.mock("../Links", () => () => <test-links />);
jest.mock("../Panels", () => () => <test-panels />);
jest.mock("../Templates", () => () => <test-templates />);
jest.mock("../Time", () => () => <test-time />);
jest.mock("../TimePicker", () => () => <test-timepicker />);

const requiredProps = {
  title: "test-title",
};

const withDefaultsProps = {
  ...requiredProps,
  refresh: "test-refresh",
  style: "dark",
  timezone: "browser",
  uid: "test-uid",
};

const withAllProps = {
  ...withDefaultsProps,
  editable: false,
  hideControls: true,
  graphTooltip: 2,
  tags: ["test-tag-1", "test-tag-2"],
};

describe("Dashboard", () => {
  describe("when passed required props", () => {
    it("should render", () => {
      expect(<Dashboard {...requiredProps} />).toMatchSnapshot();
    });
  });

  describe("when passed required props and props which don't have defaults", () => {
    it("should render", () => {
      expect(<Dashboard {...withDefaultsProps} />).toMatchSnapshot();
    });
  });

  describe("when passed all props", () => {
    it("should render", () => {
      expect(<Dashboard {...withAllProps} />).toMatchSnapshot();
    });
  });

  describe("when passed children", () => {
    it("should render", () => {
      expect(
        <Dashboard {...requiredProps}>
          <test-child test-child-prop={Symbol("test-child-value")} />
        </Dashboard>
      ).toMatchSnapshot();
    });
  });
});
