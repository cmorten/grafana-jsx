/** @jsx createObject */
import {
  Annotation,
  Annotations,
  Dashboard,
  Panels,
  Panel,
  Templates,
  Template,
  createObject,
} from "../src";

const requiredDashboardProps = {
  title: "test-title",
};

describe("Integration", () => {
  describe("when providing no configuration", () => {
    it("should create a default dashboard", () => {
      expect(<Dashboard {...requiredDashboardProps} />).toMatchSnapshot();
    });
  });

  describe("when providing custom panels", () => {
    it("should create a dashboard with panels", () => {
      expect(
        <Dashboard {...requiredDashboardProps}>
          <Panels>
            <Panel type={"text"} x={0} y={0} />
            <Panel type={"text"} x={0} y={9} />
          </Panels>
        </Dashboard>
      ).toMatchSnapshot();
    });
  });

  describe("when providing custom templating", () => {
    it("should create a dashboard with templates", () => {
      expect(
        <Dashboard {...requiredDashboardProps}>
          <Templates>
            <Template />
            <Template />
          </Templates>
        </Dashboard>
      ).toMatchSnapshot();
    });
  });

  describe("when providing custom annotations", () => {
    it("should create a dashboard with annotations", () => {
      expect(
        <Dashboard {...requiredDashboardProps}>
          <Annotations>
            <Annotation
              builtIn={0}
              datasource={"test-datasource"}
              name={"test-name"}
            />
          </Annotations>
        </Dashboard>
      ).toMatchSnapshot();
    });
  });
});
