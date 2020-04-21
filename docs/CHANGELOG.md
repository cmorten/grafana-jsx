# ChangeLog

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
