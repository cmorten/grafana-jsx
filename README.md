# grafana-jsx

A JSX library for creating JSON for Grafana.

## Contents

<!-- toc -->

- [About](#about)
- [Usage](#usage)
  - [Getting Started](#getting-started)
  - [APIs](#apis)
    - [createObject](#createobject)
      - [Options](#options)
    - [createGrafanaJsxString](#creategrafanajsxstring)
      - [Options](#options-1)
  - [Components](#components)
    - [Annotation](#annotation)
    - [Annotations](#annotations)
    - [Dashboard](#dashboard)
    - [Link](#link)
    - [Links](#links)
    - [Panel](#panel)
    - [Panels](#panels)
    - [Template](#template)
    - [Templates](#templates)
    - [Time](#time)
    - [TimePicker](#timepicker)
- [Developing](#developing)
  - [Install](#install)
  - [Build](#build)
  - [Test](#test)
    - [Unit & Integration Tests](#unit--integration-tests)
    - [Storybook](#storybook)
  - [Lint](#lint)
- [Contributing](#contributing)
- [Changelog](#changelog)

<!-- tocstop -->

## About

There are several ways now to write Grafana dashboards as code, but none which allow you to do so with JSX - a syntax which is now very common for front-end development.

This repository provides a JSX pragma for Grafana dashboard JSON creation along with some core Grafana dashboard components that can be used to create dashboards written in JSX.

This allows you to define elegant, re-usable and composable components for your dashboards that will ultimately be transpiled to JSON that can be seemlessly imported into Grafana, either by [copy and paste](https://grafana.com/docs/grafana/latest/reference/export_import/), [Dashboard API](https://grafana.com/docs/grafana/latest/http_api/dashboard/) or [scripted dashboards](https://grafana.com/docs/grafana/latest/reference/scripting/).

## Usage

### Getting Started

Install this package using npm / yarn.

```console
yarn add grafana-jsx
```

The recommended way to use this package is with JSX in your codebase. This can be achieved by using the [@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) and [babel-plugin-jsx-pragmatic](https://www.npmjs.com/package/babel-plugin-jsx-pragmatic) plugins.

Add the babel plugins to your codebase:

```console
yarn add -D @babel/plugin-transform-react-jsx babel-plugin-jsx-pragmatic
```

And update your `.babelrc` to use the JSX babel plugins:

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "jsx",
        "pragmaFrag": "jsxFrag"
      }
    ],
    [
      "babel-plugin-jsx-pragmatic",
      {
        "module": "grafana-jsx",
        "import": "jsx",
        "export": "createObject"
      },
      "jsx"
    ],
    [
      "babel-plugin-jsx-pragmatic",
      {
        "module": "grafana-jsx",
        "import": "jsxFrag",
        "export": "Fragment"
      },
      "jsxFrag"
    ]
  ]
}
```

You can now use JSX and JSX Fragments `<></>` in your codebase and Babel will parse the JSX using the `grafana-jsx` pragmas.

```jsx
import { Dashboard } from "grafana-jsx";

const MyCustomDashboard = (
  <Dashboard title={"my-dashboard"}>
    <Panels>
      <Panel type={"text"} x={0} y={0} />
      <Panel type={"text"} x={0} y={9} />
    </Panels>
  </Dashboard>
);

export default MyCustomDashboard;
```

### APIs

#### createObject

`createObject` is a JSX Pragma for creating JSON objects.

Using vanilla JS:

```js
import { createObject, Fragment } from "grafana-jsx";

/**
 * Evaluates to:
 *
 * {
 *   "myProp": "myPropValue",
 *   "childComponentName": {}
 * }
 *
 * Note that the `componentName` is not assigned as it is
 * the top level component.
 */
const myObjectWithStringComponent = createObject(
  "componentName",
  { myProp: "myPropValue" },
  [createObject("childComponentName")]
);

/**
 * Evaluates to:
 *
 * {
 *   "myProp": "myPropValue",
 *   "plain": "json children",
 *   "are": "merged",
 *   "including": [{
 *     "array": "values"
 *   }]
 * }
 *
 */
const myObjectWithJsonChildren = createObject(
  "componentName",
  { myProp: "myPropValue" },
  [
    { plain: "json children" },
    { are: "merged", including: [{ array: "values" }] },
  ]
);

const MyFunctionalComponent = ({ children, ...props }) =>
  createObject("fnComponentName", props, children);

/**
 * Evaluates to:
 *
 * {
 *   "myFnProp": "myFnPropValue",
 *   "componentName": {
 *     "myProp": "myPropValue",
 *     "childComponentName": {}
 *   }
 * }
 *
 * Note that `componentName` is used here because it is a
 * child component to the `fnComponentName` component.
 */
const myObjectWithFunctionalComponent = createObject(
  MyFunctionalComponent,
  { myFnProp: "myFnPropValue" },
  [myObjectWithStringComponent]
);

/**
 * Fragments enable array-like constructions.
 */

/**
 * Used by themselves, sub-components are assigned to an
 * array.
 *
 * Evaluates to:
 *
 * [
 *   {
 *     "myProp": "myPropValue"
 *   },
 *   {
 *     "myProp": "myPropValue"
 *   }
 * ]
 */
const myArrayUsingFragments = createObject(
  Fragment,
  {},
  createObject("componentName", { myProp: "myPropValue" }),
  createObject("componentName", { myProp: "myPropValue" })
);

/**
 * Within the scope of an outer object, the Fragment acts
 * transparently, as if it were not there.
 *
 * Evaluates to:
 *
 * {
 *   "componentName1": {
 *     "myProp": "myPropValue"
 *   },
 *   "componentName2": {
 *     "myProp": "myPropValue"
 *   }
 * }
 */
const myObjectUsingFragments = createObject(
  "componentName",
  {},
  createObject(
    Fragment,
    {},
    createObject("componentName1", { myProp: "myPropValue" }),
    createObject("componentName2", { myProp: "myPropValue" })
  )
);
```

Equivalent using JSX:

```jsx
/**
 * Evaluates to:
 *
 * {
 *   "myProp": "myPropValue",
 *   "childComponentName": {}
 * }
 *
 * Note that the `componentName` is not assigned as it is
 * the top level component.
 */
const myObjectWithStringComponent = (
  <componentName myProp={"myPropValue"}>
    <childComponentName />
  </componentName>
);

/**
 * Evaluates to:
 *
 * {
 *   "myProp": "myPropValue",
 *   "plain": "json children",
 *   "are": "merged",
 *   "including": [{
 *     "array": "values"
 *   }]
 * }
 *
 */
const myObjectWithJsonChildren = (
  <componentName myProp={"myPropValue"}>
    {{ plain: "json children" }}
    {{ are: "merged", including: [{ array: "values" }] }}
  </componentName>
);

const MyFunctionalComponent = ({ children, ...props }) => (
  <fnComponentName {...props}>{children}</fnComponentName>
);

/**
 * Evaluates to:
 *
 * {
 *   "myFnProp": "myFnPropValue",
 *   "componentName": {
 *     "myProp": "myPropValue",
 *     "childComponentName": {}
 *   }
 * }
 *
 * Note that `componentName` is used here because it is a
 * child component to the `fnComponentName` component.
 */
const myObjectWithFunctionalComponent = (
  <MyFunctionalComponent myFnProp={"myFnPropValue"}>
    {myObjectWithStringComponent}
  </MyFunctionalComponent>
);

/**
 * Fragments enable array-like constructions.
 */

/**
 * Used by themselves, sub-components are assigned to an
 * array.
 *
 * Evaluates to:
 *
 * [
 *   {
 *     "myProp": "myPropValue"
 *   },
 *   {
 *     "myProp": "myPropValue"
 *   }
 * ]
 */
const myArrayUsingFragments = (
  <>
    <componentName myProp={"myPropValue"} />
    <componentName myProp={"myPropValue"} />
  </>
);

/**
 * Within the scope of an outer object, the Fragment acts
 * transparently as if it were not there.
 *
 * Evaluates to:
 *
 * {
 *   "componentName1": {
 *     "myProp": "myPropValue"
 *   },
 *   "componentName2": {
 *     "myProp": "myPropValue"
 *   }
 * }
 */
const myObjectUsingFragments = (
  <componentName>
    <>
      <componentName1 myProp={"myPropValue"} />
      <componentName2 myProp={"myPropValue"} />
    </>
  </componentName>
);
```

##### Options

| Argument | Description                                                                                                                                                                                                                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type     | A string name, functional component or `Fragment`. If a string is provided, the value is set as a key in the parent JSON object (unless this is the top level component, in which case the type is not used). If a functional component is provided, it is evaluated using the provided `props` and `children`. |
| props    | An object containing the properties that should be assigned against the `type` key in the JSON object.                                                                                                                                                                                                          |
| children | An array of objects. If the object is a plain JSON object, it will be merged into the object assigned against the `type` key. If the object is a component then it will be added to `type` object against a key of the component's name.                                                                        |

#### createGrafanaJsxString

`createGrafanaJsxString` is a utility method for reverse engineering valid JSX from a Grafana dashboard JSON object.

Note that it relies on the JSON being passed to it being a Grafana dashboard JSON object, it will not successfully parse generic JSON into JSX that can be used with the `createObject` JSX pragma.

```jsx
import { createGrafanaJsxString } from "grafana-jsx";
import fs from "fs";

/**
 * Evaluates to:
 *
 * `<Dashboard editable={true} graphTooltip={0} hideControls={false} id={null} style={"dark"} tags={[]} timezone={"browser"} title={"test-dashboard"}>
 * <Annotations>
 * <Annotation builtIn={0} datasource={"test-datasource-1"} enable={true} hide={true} iconColor={"rgba(0, 211, 255, 1)"} name={"test-name-1"} type={"dashboard"} />
 * <Annotation builtIn={1} datasource={"test-datasource-2"} enable={true} hide={true} iconColor={"rgba(0, 211, 255, 1)"} name={"test-name-2"} type={"dashboard"} />
 * </Annotations>
 * <Links>
 * <Link icon={"external link"} tags={[]} type={"dashboards"} />
 * </Links>
 * <Panels>
 * <Panel type={"test-type-1"} x={0} y={0} w={12} h={9} />
 * <Panel type={"test-type-2"} x={0} y={9} w={12} h={9} />
 * </Panels>
 * <Templates enable={true}>
 * <Template allFormat={null} allValue={null} hide={0} includeAll={false} label={null} multi={false} options={[]} refresh={0} skipUrlSync={false} sort={0} tags={[]} useTags={false} />
 * </Templates>
 * <Time from={"now-12h"} to={"now-6h"} />
 * <TimePicker collapse={false} enable={true} notice={false} now={true} refresh_intervals={["5s","10s","30s","1m","5m","15m","30m","1h","2h","1d"]} status={"Stable"} time_options={["5m","15m","1h","6h","12h","24h","2d","7d","30d"]} type={"timepicker"} />
 * </Dashboard>`
 *
 * Note that the output JSX is quite verbose. You may be able to remove some / all
 * of the props assigned to components as they may well be defaults.
 *
 */
const grafanaJsxString = createGrafanaJsxString(
  <Dashboard title={"test-dashboard"}>
    <Annotations>
      <Annotation
        builtIn={0}
        datasource={"test-datasource-1"}
        name={"test-name-1"}
      />
      <Annotation
        builtIn={1}
        datasource={"test-datasource-2"}
        name={"test-name-2"}
      />
    </Annotations>
    <Links>
      <Link />
    </Links>
    <Panels>
      <Panel type={"test-type-1"} x={0} y={0} />
      <Panel type={"test-type-2"} x={0} y={9} />
    </Panels>
    <Templates>
      <Template />
    </Templates>
    <Time from={"now-12h"} to={"now-6h"} />
    <TimePicker />
  </Dashboard>
);

/**
 * You can then write the output to a file for use as code.
 */

const dashboardFileContents = `
import {
  Annotation,
  Annotations,
  Dashboard,
  Link,
  Links,
  Panel,
  Panels,
  Row,
  Template,
  Templates,
  Time,
  TimePicker
} from "grafana-jsx";

const MyDashboard = (
  ${grafanaJsxString}
);

export default MyDashboard;
`;

fs.writeFile("my-test-dashboard.js", dashboardFileContents, (error) => {
  if (error) {
    return console.error(error);
  }

  console.log("Dashboard JSX file succesfully written!");
});
```

##### Options

| Argument | Description                                                             |
| -------- | ----------------------------------------------------------------------- |
| json     | The Grafana dashboard JSON that you wish to convert to a string of JSX. |

### Components

#### Annotation

Creates an annotation object.

```jsx
const myAnnotation = (
  <Annotation
    builtIn={0}
    datasource={"myDatasource"}
    enable={true}
    hide={false}
    iconColor={"green"}
    name={"annotation-1"}
    type={"dashboard"}
  />
);
```

See the [Grafana dashboard Annotation documentation](https://grafana.com/docs/grafana/latest/reference/dashboard/#annotations) for further details.

#### Annotations

Creates an annotations object. Expected to be composed with `Annotation` components.

```jsx
const myAnnotations = (
  <Annotations>
    <Annotation />
  </Annotations>
);
```

See the [Grafana dashboard Annotation documentation](https://grafana.com/docs/grafana/latest/reference/dashboard/#annotations) for further details.

#### Dashboard

Creates a Grafana dashboard object. Expected to be composed with other components.

```jsx
const myDashboard = (
  <Dashboard
    editable={true}
    hideControls={false}
    graphTooltip={0}
    refresh={null}
    style={"light"}
    tags={["dashboard-tag-1"]}
    title={"my-dashboard-title"}
    timezone={"browser"}
    uid={null}
  >
    <Annotations>
      <Annotation />
    </Annotations>
  </Dashboard>
);
```

See the [Grafana dashboard JSON documentation](https://grafana.com/docs/grafana/latest/reference/dashboard/#json-fields) for further details.

#### Link

Creates a link object.

```jsx
const myLink = <Link icon={"external link"} tags={[]} type={"dashboards"} />;
```

#### Links

Creates an links object. Expected to be composed with Link components.

```jsx
const myLinks = (
  <Links>
    <Link />
  </Links>
);
```

#### Panel

Creates a panel object.

```jsx
const myPanel = (
  <Panel
    type={"text"}
    title={"myPanel"}
    x={0}
    y={0}
    width={12}
    height={9}
    options={null}
  />
);
```

See the [Grafana dashboard Panels documentation](https://grafana.com/docs/grafana/latest/reference/dashboard/#panels) for further details.

#### Panels

Creates an panels object. Expected to be composed with Panel components.

```jsx
const myPanels = (
  <Panels>
    <Panel />
  </Panels>
);
```

See the [Grafana dashboard Panels documentation](https://grafana.com/docs/grafana/latest/reference/dashboard/#panels) for further details.

#### Template

Creates a template object.

```jsx
const myTemplate = (
  <Template
    allFormat={null}
    allValue={null}
    current={null}
    datasource={null}
    definition={null}
    hide={0}
    includeAll={false}
    label={null}
    multi={false}
    multiFormat={null}
    name={"region"}
    options={[]}
    query={null}
    refresh={0}
    regex={null}
    skipUrlSync={false}
    sort={0}
    tagValuesQuery={null}
    tags={[]}
    tagsQuery={null}
    type={"query"}
    useTags={false}
  />
);
```

See the [Grafana dashboard Templating documentation](https://grafana.com/docs/grafana/latest/reference/dashboard/#templating) for further details.

#### Templates

Creates an templates object. Expected to be composed with Template components.

```jsx
const myTemplates = (
  <Templates enable={true}>
    <Template />
  </Templates>
);
```

See the [Grafana dashboard Templating documentation](https://grafana.com/docs/grafana/latest/reference/dashboard/#templating) for further details.

#### Time

Creates a time object.

```jsx
const myTime = <Time from={"now-6h"} to={"now"} />;
```

See the [Grafana dashboard JSON documentation](https://grafana.com/docs/grafana/latest/reference/dashboard/#json-fields) for further details.

#### TimePicker

Creates a timepicker object.

```jsx
const myTimepicker = (
  <TimePicker
    collapse={false}
    enable={true}
    notice={false}
    now={true}
    refreshIntervals={[
      "5s",
      "10s",
      "30s",
      "1m",
      "5m",
      "15m",
      "30m",
      "1h",
      "2h",
      "1d",
    ]}
    timeOptions={["5m", "15m", "1h", "6h", "12h", "24h", "2d", "7d", "30d"]}
    status={"Stable"}
    type={"timepicker"}
  />
);
```

See the [Grafana dashboard Timepicker documentation](https://grafana.com/docs/grafana/latest/reference/dashboard/#timepicker) for further details.

## Developing

### Install

```console
yarn install --frozen-lockfile
```

### Build

```console
yarn build
```

### Test

#### Unit & Integration Tests

```console
yarn test
```

#### Storybook

Start the Grafana JSX Storybook instance:

```console
yarn storybook
```

Refer to the [Storybook README](./test/storybook/README.md) for further information.

### Lint

```console
yarn lint
```

## Contributing

Please check out the [CONTRIBUTING](./docs/CONTRIBUTING.md) docs.

## Changelog

Please check out the [CHANGELOG](./docs/CHANGELOG.md) docs.
