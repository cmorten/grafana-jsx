/**
 * Inspired by Jason Miller's (@_developit) jsxobj.
 *
 * REF: https://github.com/developit/jsxobj
 */

import { checkPropTypes } from "prop-types";
import { JSX_COMPONENT_NAME_KEY, JSX_FRAGEMENT_TYPE } from "./symbols";

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
  component.displayName || component.name || component.constructor.name;

const checkProps = (component, componentObject) => {
  if (component.PropTypes) {
    const componentName = getComponentName(component);

    checkPropTypes(component.PropTypes, componentObject, "prop", componentName);
  }
};

const createFragment = (props, children) => {
  children.forEach((childObject, index) => {
    props[index] = childObject;
  });

  return Object.values(props);
};

const createElement = (component, props, children) => {
  Object.defineProperty(props, JSX_COMPONENT_NAME_KEY, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: component,
  });

  children.forEach((childObject) => {
    const { [JSX_COMPONENT_NAME_KEY]: objectName } = childObject || {};

    if (objectName) {
      props[objectName] = childObject;
    } else {
      Object.assign(props, childObject);
    }
  });

  return props;
};

const createObject = (component, props, ...children) => {
  if (typeof component === "undefined" || component === null) {
    return null;
  }

  props = parseProps(props);
  children = parseChildren(children);

  checkProps(component, {
    ...props,
    children,
  });

  if (typeof component === "function") {
    return component({
      ...props,
      children,
    });
  }

  delete props.children;

  if (component === JSX_FRAGEMENT_TYPE) {
    return createFragment(props, children);
  }

  return createElement(component, props, children);
};

export { createObject, JSX_FRAGEMENT_TYPE as Fragment };
