import Time from "./";

const withAllProps = {
  from: "test-from",
  to: "test-to",
};

describe("Time", () => {
  describe("when used in isolation", () => {
    describe("when passed no props", () => {
      it("should render the default time object", () => {
        expect(<Time />).toMatchSnapshot();
      });
    });

    describe("when passed all props", () => {
      it("should render a custom time object", () => {
        expect(<Time {...withAllProps} />).toMatchSnapshot();
      });
    });
  });

  describe("when used within another object", () => {
    describe("when passed no props", () => {
      it("should add a default time object to the outer object", () => {
        expect(
          <test>
            <Time />
          </test>
        ).toMatchSnapshot();
      });
    });

    describe("when passed all props", () => {
      it("should add a custom time object to the outer object", () => {
        expect(
          <test>
            <Time {...withAllProps} />
          </test>
        ).toMatchSnapshot();
      });
    });
  });
});
