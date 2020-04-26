import Row from "./";

jest.mock("../Panels", () => ({ children }) => ({ "test-panels": children }));

const requiredProps = {
  y: 0,
};

const withAllProps = {
  ...requiredProps,
  collapsed: true,
  datasource: "test-datasource",
  title: "test-title",
  options: { "test-option-key": "test-option-value" },
};

const TestArray = ({ children }) => children;

describe("Row", () => {
  describe("when used in isolation", () => {
    describe("when passed no Panel children", () => {
      describe("when passed required props", () => {
        it("should render a default row with required props", () => {
          expect(<Row {...requiredProps} />).toMatchSnapshot();
        });
      });

      describe("when passed all props", () => {
        it("should render a custom row", () => {
          expect(<Row {...withAllProps} />).toMatchSnapshot();
        });
      });

      describe("when passed custom props", () => {
        it("should render a custom row with the custom props", () => {
          expect(
            <Row {...withAllProps} test-row-prop={Symbol("test-row-value")} />
          ).toMatchSnapshot();
        });
      });
    });

    describe("when passed Panel children", () => {
      describe("and the panel is collapsed", () => {
        describe("when passed required props", () => {
          it("should render a default row with required props", () => {
            expect(
              <Row {...requiredProps} collapsed={true}>
                <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
              </Row>
            ).toMatchSnapshot();
          });
        });

        describe("when passed all props", () => {
          it("should render a custom row", () => {
            expect(
              <Row {...withAllProps} collapsed={true}>
                <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
              </Row>
            ).toMatchSnapshot();
          });
        });

        describe("when passed custom props", () => {
          it("should render a custom row with the custom props", () => {
            expect(
              <Row
                {...withAllProps}
                collapsed={true}
                test-row-prop={Symbol("test-row-value")}
              >
                <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
              </Row>
            ).toMatchSnapshot();
          });
        });
      });

      describe("and the panel is not collapsed", () => {
        describe("when passed required props", () => {
          it("should render a default row with required props", () => {
            expect(
              <Row {...requiredProps} collapsed={false}>
                <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
              </Row>
            ).toMatchSnapshot();
          });
        });

        describe("when passed all props", () => {
          it("should render a custom row", () => {
            expect(
              <Row {...withAllProps} collapsed={false}>
                <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
              </Row>
            ).toMatchSnapshot();
          });
        });

        describe("when passed custom props", () => {
          it("should render a custom row with the custom props", () => {
            expect(
              <Row
                {...withAllProps}
                collapsed={false}
                test-row-prop={Symbol("test-row-value")}
              >
                <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
              </Row>
            ).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe("when used within another object", () => {
    describe("when passed no Panel children", () => {
      describe("when passed required props", () => {
        it("should render a default row with required props", () => {
          expect(
            <test>
              <Row {...requiredProps} />
            </test>
          ).toMatchSnapshot();
        });
      });

      describe("when passed all props", () => {
        it("should render a custom row", () => {
          expect(
            <test>
              <Row {...withAllProps} />
            </test>
          ).toMatchSnapshot();
        });
      });

      describe("when passed custom props", () => {
        it("should render a custom row with the custom props", () => {
          expect(
            <test>
              <Row {...withAllProps} test-row-prop={Symbol("test-row-value")} />
            </test>
          ).toMatchSnapshot();
        });
      });
    });

    describe("when passed Panel children", () => {
      describe("and the panel is collapsed", () => {
        describe("when passed required props", () => {
          it("should render a default row with required props", () => {
            expect(
              <test>
                <Row {...requiredProps} collapsed={true}>
                  <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                  <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
                </Row>
              </test>
            ).toMatchSnapshot();
          });
        });

        describe("when passed all props", () => {
          it("should render a custom row", () => {
            expect(
              <test>
                <Row {...withAllProps} collapsed={true}>
                  <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                  <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
                </Row>
              </test>
            ).toMatchSnapshot();
          });
        });

        describe("when passed custom props", () => {
          it("should render a custom row with the custom props", () => {
            expect(
              <test>
                <Row
                  {...withAllProps}
                  collapsed={true}
                  test-row-prop={Symbol("test-row-value")}
                >
                  <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                  <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
                </Row>
              </test>
            ).toMatchSnapshot();
          });
        });
      });

      describe("and the panel is not collapsed", () => {
        describe("when passed required props", () => {
          it("should render a default row with required props", () => {
            expect(
              <test>
                <Row {...requiredProps} collapsed={false}>
                  <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                  <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
                </Row>
              </test>
            ).toMatchSnapshot();
          });
        });

        describe("when passed all props", () => {
          it("should render a custom row", () => {
            expect(
              <test>
                <Row {...withAllProps} collapsed={false}>
                  <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                  <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
                </Row>
              </test>
            ).toMatchSnapshot();
          });
        });

        describe("when passed custom props", () => {
          it("should render a custom row with the custom props", () => {
            expect(
              <test>
                <Row
                  {...withAllProps}
                  collapsed={false}
                  test-row-prop={Symbol("test-row-value")}
                >
                  <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                  <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
                </Row>
              </test>
            ).toMatchSnapshot();
          });
        });
      });
    });
  });

  describe("when used within another object's array", () => {
    describe("when passed no Panel children", () => {
      describe("when passed required props", () => {
        it("should render a default row with required props", () => {
          expect(
            <TestArray>
              <Row {...requiredProps} />
            </TestArray>
          ).toMatchSnapshot();
        });
      });

      describe("when passed all props", () => {
        it("should render a custom row", () => {
          expect(
            <TestArray>
              <Row {...withAllProps} />
            </TestArray>
          ).toMatchSnapshot();
        });
      });

      describe("when passed custom props", () => {
        it("should render a custom row with the custom props", () => {
          expect(
            <TestArray>
              <Row {...withAllProps} test-row-prop={Symbol("test-row-value")} />
            </TestArray>
          ).toMatchSnapshot();
        });
      });
    });

    describe("when passed Panel children", () => {
      describe("and the panel is collapsed", () => {
        describe("when passed required props", () => {
          it("should render a default row with required props", () => {
            expect(
              <TestArray>
                <Row {...requiredProps} collapsed={true}>
                  <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                  <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
                </Row>
              </TestArray>
            ).toMatchSnapshot();
          });
        });

        describe("when passed all props", () => {
          it("should render a custom row", () => {
            expect(
              <TestArray>
                <Row {...withAllProps} collapsed={true}>
                  <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                  <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
                </Row>
              </TestArray>
            ).toMatchSnapshot();
          });
        });

        describe("when passed custom props", () => {
          it("should render a custom row with the custom props", () => {
            expect(
              <TestArray>
                <Row
                  {...withAllProps}
                  collapsed={true}
                  test-row-prop={Symbol("test-row-value")}
                >
                  <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                  <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
                </Row>
              </TestArray>
            ).toMatchSnapshot();
          });
        });
      });

      describe("and the panel is not collapsed", () => {
        describe("when passed required props", () => {
          it("should render a default row with required props", () => {
            expect(
              <TestArray>
                <Row {...requiredProps} collapsed={false}>
                  <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                  <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
                </Row>
              </TestArray>
            ).toMatchSnapshot();
          });
        });

        describe("when passed all props", () => {
          it("should render a custom row", () => {
            expect(
              <TestArray>
                <Row {...withAllProps} collapsed={false}>
                  <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                  <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
                </Row>
              </TestArray>
            ).toMatchSnapshot();
          });
        });

        describe("when passed custom props", () => {
          it("should render a custom row with the custom props", () => {
            expect(
              <TestArray>
                <Row
                  {...withAllProps}
                  collapsed={false}
                  test-row-prop={Symbol("test-row-value")}
                >
                  <test-panel-1 test-panel-prop={Symbol("test-panel-value")} />
                  <test-panel-2 test-panel-prop={Symbol("test-panel-value")} />
                </Row>
              </TestArray>
            ).toMatchSnapshot();
          });
        });
      });
    });
  });
});
