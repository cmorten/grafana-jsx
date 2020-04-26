const createAnnotationJsx = (array) =>
  array.map((json) => createJsx(json, "Annotation", {})).join("\n");

const createAnnotationsJsx = (json) =>
  createJsx(json, "Annotations", {
    list: createAnnotationJsx,
  });

const createLinkJsx = (json) => createJsx(json, "Link", {});

const createLinksJsx = (array) =>
  array.length
    ? `<Links>\n${array
        .map((json) => createLinkJsx(json))
        .join("\n")}\n</Links>`
    : "<Links />";

const createPanelJsx = (json) => {
  const {
    gridPos: { x, y, w: width, h: height },
    ...rest
  } = json;

  return createJsx({ ...rest, x, y, width, height }, "Panel", {});
};

const createRowPanelsJsx = (array) =>
  array.map((json) => createPanelJsx(json)).join("\n");

const createRowJsx = (json) => {
  const {
    gridPos: { y },
    ...rest
  } = json;

  delete rest.type;

  return createJsx({ ...rest, y }, "Row", {
    panels: createRowPanelsJsx,
  });
};

const createPanelsJsx = (array) =>
  array.length
    ? `<Panels>\n${array
        .map((json) =>
          json.type === "row" ? createRowJsx(json) : createPanelJsx(json)
        )
        .join("\n")}\n</Panels>`
    : "<Panels />";

const createTemplateJsx = (array) =>
  array.map((json) => createJsx(json, "Template", {})).join("\n");

const createTemplatesJsx = (json) =>
  createJsx(json, "Templates", {
    list: createTemplateJsx,
  });
const createTimeJsx = (json) => createJsx(json, "Time", {});

const createTimePickerJsx = (json) => createJsx(json, "TimePicker", {});

const createJsx = (json, componentName, childrenKeys) => {
  const entries = Object.entries(json);

  const componentEntries = entries.filter(
    ([key]) => !Object.keys(childrenKeys).includes(key)
  );
  const componentPropsString = componentEntries.reduce(
    (currentPropsString, [key, value]) =>
      `${currentPropsString} ${key}={${JSON.stringify(value)}}`,
    ""
  );

  const childrenEntries = entries.filter(([key]) =>
    Object.keys(childrenKeys).includes(key)
  );
  const children = childrenEntries
    .map(([key, value]) => childrenKeys[key](value))
    .filter(Boolean)
    .map((value) => `${value}\n`)
    .join("");

  return `<${componentName}${componentPropsString}${
    children.length ? `>\n${children}</${componentName}>` : " />"
  }`;
};

const createJsxEntrypoint = (json) =>
  createJsx(json, "Dashboard", {
    annotations: createAnnotationsJsx,
    links: createLinksJsx,
    panels: createPanelsJsx,
    templating: createTemplatesJsx,
    time: createTimeJsx,
    timepicker: createTimePickerJsx,
  });

export default createJsxEntrypoint;
