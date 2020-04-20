import TimePicker from "./";

const withAllProps = {
  collapse: true,
  enable: false,
  notice: true,
  now: false,
  refreshIntervals: ["test-refresh-interval-1", "test-refresh-interval-2"],
  timeOptions: ["test-time-option-1", "test-time-option-2"],
  status: "test-status",
  type: "test-type",
};

describe("TimePicker", () => {
  describe("when used in isolation", () => {
    describe("when passed no props", () => {
      it("should render the default timepicker object", () => {
        expect(<TimePicker />).toMatchSnapshot();
      });
    });

    describe("when passed all props", () => {
      it("should render a custom timepicker object", () => {
        expect(<TimePicker {...withAllProps} />).toMatchSnapshot();
      });
    });
  });

  describe("when used within another object", () => {
    describe("when passed no props", () => {
      it("should add a default timepicker object to the outer object", () => {
        expect(
          <test>
            <TimePicker />
          </test>
        ).toMatchSnapshot();
      });
    });

    describe("when passed all props", () => {
      it("should add a custom timepicker object to the outer object", () => {
        expect(
          <test>
            <TimePicker {...withAllProps} />
          </test>
        ).toMatchSnapshot();
      });
    });
  });
});
