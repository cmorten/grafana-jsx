# ChangeLog

## [1.2.3] - 27-04-2020

### Added

- Added `rollup-plugin-terser` for bundle minification.

## [1.2.2] - 26-04-2020

### Updated

- Touch-ups to the Docs.
- Ensure `yarn.lock` is shipped in package.

## [1.2.1] - 26-04-2020

### Updated

- Refactor to `jsxJson.js`, removing impossible code paths.
- Refactor components to remove superfluous `children` prop default.
- Additional unit tests for `jsJson.js` to reach 100% coverage.

## [1.2.0] - 26-04-2020

### Added

- Added `Fragment` pragma.
- Added `Row` Grafana component which creates a `Panel` of type `row` which accepts panels as children and handles collapsed and uncollapsed states. Additional integration tests.
- Added a "Storybook" sub-repo in [test/storybook](../test/storybook/README.md) which demonstrates using `grafana-jsx` (from the generated `./lib` resources) to create a dashboard in JSX and then building + provisioning to a running Grafana instance.

### Updated

- Updated `createObject` JSX pragma logic to accomodate `Fragment`.
- Corrected code in `createGrafanaJsxString` section of readme for variable name clash.
- Updated getting started section of readme to include adding a `Fragment` pragma and some usage examples.
- Updated `Panel` component to expect a `datasource` prop.
- Updated `Template` component to expect an `index` prop, and set some more defaults.
- Updated `createGrafanaJsxString` to convert row panels to `Row` JSX components.

## [1.1.0] - 21-04-2020

### Added

- Added createGrafanaJsxString for creating JSX from a Grafana dashboard JSON object.

### Updated

- Updated readme with details of usage and interfaces.

## [1.0.0] - 20-04-2020

### Added

- Added createObject JSX pragma.
- Added initial set of Grafana components:
  - Annotation - Creates an annotation object.
  - Annotations - Creates an annotations object. Expected to be composed with Annotation components.
  - Dashboard - Creates a Grafana dashboard object. Expected to be composed with other components.
  - Link - Creates a link object.
  - Links - Creates an links object. Expected to be composed with Link components.
  - Panel - Creates a panel object.
  - Panels - Creates an panels object. Expected to be composed with Panel components.
  - Template - Creates a template object.
  - Templates - Creates an templates object. Expected to be composed with Template components.
  - Time - Creates a time object.
  - TimePicker - Creates a timepicker object.
