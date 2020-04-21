/**
 * Inspired by Jason Miller's (@_developit) jsxobj.
 *
 * REF: https://github.com/developit/jsxobj
 */

import PropTypes from "prop-types";

const JSX_COMPONENT_NAME = Symbol("JSX_COMPONENT_NAME");

const isObject = (objectLike) =>
  typeof objectLike === "object" && objectLike !== null;

const parseProps = (props) =>
  isObject(props)
    ? {
        ...Object.entries(props).reduce(
          (definedProps, [key, value]) => ({
            ...definedProps,
            ...(typeof value !== "undefined" ? { [key]: value } : {}),
          }),
          {}
        ),
      }
    : {};

const parseChildren = (children) => [].concat.apply([], children);

const getComponentName = (component) =>
  typeof component === "string"
    ? component
    : component.displayName || component.name || component.constructor.name;

const checkProps = (component, componentObject) => {
  if (component.PropTypes) {
    const componentName = getComponentName(component);

    PropTypes.checkPropTypes(
      component.PropTypes,
      componentObject,
      "prop",
      componentName
    );
  }
};

const createObject = (component, props, ...children) => {
  if (typeof component === "undefined" || component === null) {
    return null;
  }

  props = parseProps(props);
  children = parseChildren(children);

  const componentObject = {
    ...props,
    children,
  };

  checkProps(component, componentObject);

  if (typeof component === "function") {
    return component(componentObject);
  }

  Object.defineProperty(componentObject, JSX_COMPONENT_NAME, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: component,
  });

  delete componentObject.children;

  children.forEach((childObject) => {
    const { [JSX_COMPONENT_NAME]: objectName } = childObject || {};

    if (objectName) {
      componentObject[objectName] = childObject;
    } else {
      Object.assign(componentObject, childObject);
    }
  });

  return componentObject;
};

export default createObject;
