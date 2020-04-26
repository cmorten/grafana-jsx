import { createObject, Fragment } from "./jsxJson";

const mockObjectName = "test-object";

const mockProps = {
  "test-prop-key-1": Symbol("test-prop-value-1"),
  "test-prop-key-2": Symbol("test-prop-value-2"),
};

const mockObjectChild = { "test-child-key": Symbol("test-child-value") };

const mockJsxChildName = "test-jsx-child";
const mockJsxChild = createObject(mockJsxChildName, {
  "test-child-key": Symbol("test-child-value"),
});

const mockFunctionalChildName = "test-functional-child";
const MockFunctionalChild = ({ children, ...props }) =>
  createObject(mockFunctionalChildName, props, ...children);

describe("jsxJson", () => {
  describe("when passed a string component", () => {
    describe("and no props", () => {
      describe("and no children", () => {
        it("should return an empty object", () => {
          expect(createObject(mockObjectName)).toEqual({});
        });
      });

      describe("and children", () => {
        describe("and the child is a plain object", () => {
          it("should return an object containing the child keys and values", () => {
            expect(createObject(mockObjectName, null, mockObjectChild)).toEqual(
              {
                ...mockObjectChild,
              }
            );
          });
        });

        describe("and the child is a component", () => {
          it("should return an object containing the child object", () => {
            expect(createObject(mockObjectName, null, mockJsxChild)).toEqual({
              [mockJsxChildName]: {
                ...mockJsxChild,
              },
            });
          });
        });
      });
    });

    describe("and props", () => {
      describe("and no children", () => {
        it("should return an object containing the prop keys and values", () => {
          expect(createObject(mockObjectName, mockProps)).toEqual({
            ...mockProps,
          });
        });
      });

      describe("and children", () => {
        describe("and the child is a plain object", () => {
          it("should return an object containing the prop and child keys and values", () => {
            expect(
              createObject(mockObjectName, mockProps, mockObjectChild)
            ).toEqual({
              ...mockProps,
              ...mockObjectChild,
            });
          });
        });

        describe("and the child is a component", () => {
          it("should return an object containing the prop keys and values and containing the child object", () => {
            expect(
              createObject(mockObjectName, mockProps, mockJsxChild)
            ).toEqual({
              ...mockProps,
              [mockJsxChildName]: {
                ...mockJsxChild,
              },
            });
          });
        });

        describe("and the child is a functional component", () => {
          it("should return an object containing the prop keys and values and containing the child object", () => {
            expect(
              createObject(
                mockObjectName,
                mockProps,
                createObject(MockFunctionalChild, mockProps, mockObjectChild)
              )
            ).toEqual({
              ...mockProps,
              [mockFunctionalChildName]: {
                ...mockProps,
                ...mockObjectChild,
              },
            });
          });
        });
      });
    });
  });

  describe("when passed a functional component", () => {
    describe("and no props", () => {
      describe("and no children", () => {
        it("should return an empty object", () => {
          expect(createObject(MockFunctionalChild)).toEqual({});
        });
      });

      describe("and children", () => {
        describe("and the child is a plain object", () => {
          it("should return an object containing the child keys and values", () => {
            expect(
              createObject(MockFunctionalChild, null, mockObjectChild)
            ).toEqual({
              ...mockObjectChild,
            });
          });
        });

        describe("and the child is a component", () => {
          it("should return an object containing the child object", () => {
            expect(
              createObject(MockFunctionalChild, null, mockJsxChild)
            ).toEqual({
              [mockJsxChildName]: {
                ...mockJsxChild,
              },
            });
          });
        });
      });
    });

    describe("and props", () => {
      describe("and no children", () => {
        it("should return an object containing the prop keys and values", () => {
          expect(createObject(MockFunctionalChild, mockProps)).toEqual({
            ...mockProps,
          });
        });
      });

      describe("and children", () => {
        describe("and the child is a plain object", () => {
          it("should return an object containing the child keys and values", () => {
            expect(
              createObject(MockFunctionalChild, mockProps, mockObjectChild)
            ).toEqual({
              ...mockProps,
              ...mockObjectChild,
            });
          });
        });

        describe("and the child is a component", () => {
          it("should return an object containing the prop keys and values and containing the child object", () => {
            expect(
              createObject(MockFunctionalChild, mockProps, mockJsxChild)
            ).toEqual({
              ...mockProps,
              [mockJsxChildName]: {
                ...mockJsxChild,
              },
            });
          });
        });
      });
    });
  });

  describe("when passed a Fragment", () => {
    describe("and no props", () => {
      describe("and no children", () => {
        it("should return an empty array", () => {
          expect(createObject(Fragment)).toEqual([]);
        });
      });

      describe("and children", () => {
        describe("and the child is a plain object", () => {
          it("should return an array containing the child", () => {
            expect(createObject(Fragment, null, mockObjectChild)).toEqual([
              mockObjectChild,
            ]);
          });
        });

        describe("and the child is a component", () => {
          it("should return an array containing the child object", () => {
            expect(createObject(Fragment, null, mockJsxChild)).toEqual([
              mockJsxChild,
            ]);
          });
        });
      });
    });

    describe("and props", () => {
      describe("and no children", () => {
        it("should return an array containing the prop values", () => {
          expect(createObject(Fragment, mockProps)).toEqual(
            Object.values(mockProps)
          );
        });
      });

      describe("and children", () => {
        describe("and the children are plain objects", () => {
          it("should return an array containing the prop values and child", () => {
            expect(
              createObject(
                Fragment,
                mockProps,
                mockObjectChild,
                mockObjectChild
              )
            ).toEqual([
              mockObjectChild,
              mockObjectChild,
              ...Object.values(mockProps),
            ]);
          });
        });

        describe("and the children are components", () => {
          it("should return an array containing the prop values and containing the child objects", () => {
            expect(
              createObject(Fragment, mockProps, mockJsxChild, mockJsxChild)
            ).toEqual([
              mockJsxChild,
              mockJsxChild,
              ...Object.values(mockProps),
            ]);
          });
        });

        describe("and the children are functional components", () => {
          it("should return an array containing the prop values and containing the child objects", () => {
            expect(
              JSON.stringify(
                createObject(
                  Fragment,
                  mockProps,
                  createObject(MockFunctionalChild, mockProps, mockObjectChild),
                  createObject(MockFunctionalChild, mockProps, mockObjectChild)
                )
              )
            ).toEqual(
              JSON.stringify([
                { ...mockJsxChild, ...mockProps },
                { ...mockJsxChild, ...mockProps },
                ...Object.values(mockProps),
              ])
            );
          });
        });
      });
    });
  });
});
