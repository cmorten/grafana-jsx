import { createObject, Fragment } from "./jsxJson";
import { checkPropTypes } from "prop-types";

jest.mock("prop-types", () => ({
  checkPropTypes: jest.fn(),
}));

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

const mockFunctionalChildNameWithPropTypes =
  "test-functional-child-with-prop-types";
const MockFunctionalChildWithPropTypes = ({ children, ...props }) =>
  createObject(mockFunctionalChildNameWithPropTypes, props, ...children);

MockFunctionalChildWithPropTypes.PropTypes = {
  mockProp1: jest.fn(),
  mockProp2: jest.fn(),
};

const mockFunctionalChildNameWithPropTypesAndDisplayName =
  "test-functional-child-with-prop-types-and-display-name";
const MockFunctionalChildWithPropTypesAndDisplayName = ({
  children,
  ...props
}) =>
  createObject(
    mockFunctionalChildNameWithPropTypesAndDisplayName,
    props,
    ...children
  );

MockFunctionalChildWithPropTypesAndDisplayName.PropTypes = {
  mockProp1: jest.fn(),
  mockProp2: jest.fn(),
};

MockFunctionalChildWithPropTypesAndDisplayName.displayName = "test-displayName";

const mockFunctionalChildNameWithPropTypesAndNoName =
  "test-functional-child-with-prop-types-and-no-name";
const MockFunctionalChildWithPropTypesAndNoName = (() => ({
  children,
  ...props
}) =>
  createObject(
    mockFunctionalChildNameWithPropTypesAndNoName,
    props,
    ...children
  ))();

MockFunctionalChildWithPropTypesAndNoName.PropTypes = {
  mockProp1: jest.fn(),
  mockProp2: jest.fn(),
};

describe("jsxJson", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("when not passed a component", () => {
    it("should return null", () => {
      expect(createObject()).toBeNull();
    });
  });

  describe("when passed an undefined component", () => {
    it("should return null", () => {
      expect(createObject(undefined)).toBeNull();
    });
  });

  describe("when passed a null component", () => {
    it("should return null", () => {
      expect(createObject(null)).toBeNull();
    });
  });

  describe("when passed a string component", () => {
    describe("and no props", () => {
      describe("and no children", () => {
        it("should return an empty object", () => {
          expect(createObject(mockObjectName)).toEqual({});
        });
      });

      describe("and children", () => {
        describe("and the child is null", () => {
          it("should return an empty object", () => {
            expect(createObject(mockObjectName, null, null)).toEqual({});
          });
        });

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

        describe("and the child is a Fragment containing a child component", () => {
          it("should return an object containing the Fragment's child object", () => {
            expect(
              createObject(
                mockObjectName,
                null,
                createObject(Fragment, null, mockJsxChild)
              )
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
          expect(createObject(mockObjectName, mockProps)).toEqual({
            ...mockProps,
          });
        });

        it("should not set any `undefined` props in the returned object", () => {
          expect(
            createObject(mockObjectName, {
              ...mockProps,
              "test-undefined-key": undefined,
            })
          ).toEqual(
            expect.not.objectContaining({
              "test-undefined-key": undefined,
            })
          );
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

          it("should not set any `undefined` props in the returned object", () => {
            expect(
              createObject(
                mockObjectName,
                {
                  ...mockProps,
                  "test-undefined-key": undefined,
                },
                mockObjectChild
              )
            ).toEqual(
              expect.not.objectContaining({
                "test-undefined-key": undefined,
              })
            );
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

          it("should not set any `undefined` props in the returned object", () => {
            expect(
              createObject(
                mockObjectName,
                {
                  ...mockProps,
                  "test-undefined-key": undefined,
                },
                mockJsxChild
              )
            ).toEqual(
              expect.not.objectContaining({
                "test-undefined-key": undefined,
              })
            );
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

          it("should not set any `undefined` props in the returned object", () => {
            expect(
              createObject(
                mockObjectName,
                {
                  ...mockProps,
                  "test-undefined-key": undefined,
                },
                createObject(MockFunctionalChild, mockProps, mockObjectChild)
              )
            ).toEqual(
              expect.not.objectContaining({
                "test-undefined-key": undefined,
              })
            );
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

        it("should not set any `undefined` props in the returned object", () => {
          expect(
            createObject(MockFunctionalChild, {
              ...mockProps,
              "test-undefined-key": undefined,
            })
          ).toEqual(
            expect.not.objectContaining({
              "test-undefined-key": undefined,
            })
          );
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

          it("should not set any `undefined` props in the returned object", () => {
            expect(
              createObject(
                MockFunctionalChild,
                {
                  ...mockProps,
                  "test-undefined-key": undefined,
                },
                mockObjectChild
              )
            ).toEqual(
              expect.not.objectContaining({
                "test-undefined-key": undefined,
              })
            );
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

          it("should not set any `undefined` props in the returned object", () => {
            expect(
              createObject(
                MockFunctionalChild,
                {
                  ...mockProps,
                  "test-undefined-key": undefined,
                },
                mockJsxChild
              )
            ).toEqual(
              expect.not.objectContaining({
                "test-undefined-key": undefined,
              })
            );
          });
        });
      });
    });

    describe("and it has PropTypes defined", () => {
      describe("and the function component has a displayName", () => {
        beforeEach(() => {
          createObject(
            MockFunctionalChildWithPropTypesAndDisplayName,
            mockProps,
            mockJsxChild
          );
        });

        it("should call checkPropTypes with the component's PropTypes, the props it was passed (including children), `prop` and the component's name", () => {
          expect(checkPropTypes).toHaveBeenCalledWith(
            MockFunctionalChildWithPropTypesAndDisplayName.PropTypes,
            {
              ...mockProps,
              children: [mockJsxChild],
            },
            "prop",
            MockFunctionalChildWithPropTypesAndDisplayName.displayName
          );
        });
      });

      describe("and the function component has a name", () => {
        beforeEach(() => {
          createObject(
            MockFunctionalChildWithPropTypes,
            mockProps,
            mockJsxChild
          );
        });

        it("should call checkPropTypes with the component's PropTypes, the props it was passed (including children), `prop` and the component's name", () => {
          expect(checkPropTypes).toHaveBeenCalledWith(
            MockFunctionalChildWithPropTypes.PropTypes,
            {
              ...mockProps,
              children: [mockJsxChild],
            },
            "prop",
            MockFunctionalChildWithPropTypes.name
          );
        });
      });

      describe("and the function component does not have a displayName nor a name", () => {
        beforeEach(() => {
          createObject(
            MockFunctionalChildWithPropTypesAndNoName,
            mockProps,
            mockJsxChild
          );
        });

        it("should call checkPropTypes with the component's PropTypes, the props it was passed (including children), `prop` and the component's constructor name", () => {
          expect(checkPropTypes).toHaveBeenCalledWith(
            MockFunctionalChildWithPropTypesAndNoName.PropTypes,
            {
              ...mockProps,
              children: [mockJsxChild],
            },
            "prop",
            MockFunctionalChildWithPropTypesAndNoName.constructor.name
          );
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

        it("should not set any `undefined` values in the returned array", () => {
          expect(
            createObject(Fragment, {
              ...mockProps,
              "test-undefined-key": undefined,
            })
          ).toEqual(expect.not.arrayContaining([undefined]));
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

          it("should not set any `undefined` values in the returned array", () => {
            expect(
              createObject(
                Fragment,
                {
                  ...mockProps,
                  "test-undefined-key": undefined,
                },
                mockObjectChild,
                mockObjectChild
              )
            ).toEqual(expect.not.arrayContaining([undefined]));
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

          it("should not set any `undefined` values in the returned array", () => {
            expect(
              createObject(
                Fragment,
                {
                  ...mockProps,
                  "test-undefined-key": undefined,
                },
                mockJsxChild,
                mockJsxChild
              )
            ).toEqual(expect.not.arrayContaining([undefined]));
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

          it("should not set any `undefined` values in the returned array", () => {
            expect(
              createObject(
                Fragment,
                {
                  ...mockProps,
                  "test-undefined-key": undefined,
                },
                createObject(MockFunctionalChild, mockProps, mockObjectChild),
                createObject(MockFunctionalChild, mockProps, mockObjectChild)
              )
            ).toEqual(expect.not.arrayContaining([undefined]));
          });
        });
      });
    });
  });
});
