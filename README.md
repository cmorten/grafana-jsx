# grafana-jsx

## About

There are several ways now to write Grafana dashboards as code, but none I've seen as yet which allow you to do so with JSX - a syntax which is now very common for front-end development.

This repository provides a JSX pragma for Grafana dashboard JSON creation along with some core Grafana dashboard components that can be used to create dashboards written in JSX.

This allows you to define elegant, re-usable and composable components for your dashboards that will ultimately be transpiled to JSON that can be seemlessly imported into Grafana, either by [copy and paste](https://grafana.com/docs/grafana/latest/reference/export_import/), [Dashboard API](https://grafana.com/docs/grafana/latest/http_api/dashboard/) or [scripted dashboards](https://grafana.com/docs/grafana/latest/reference/scripting/).

## Usage

The recommended way to use this package is with JSX in your codebase. This can be achieved by using the [@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) plugin to use this repositories custom JSX pragma.

Add the babel plugin to your codebase:

```console
yarn add -D @babel/plugin-transform-react-jsx
```

And update your `.babelrc` to use the JSX babel plugin:

```json
{
  "plugins": ["@babel/plugin-transform-react-jsx"]
}
```

You can then use JSX Pragma comments to use the `grafana-jsx` `createObject` method.

```js
/** @jsx createObject */
import { Dashboard, createObject } from "grafana-jsx";

const CustomDashboard = (
  <Dashboard {...requiredDashboardProps}>
    <Panels>
      <Panel type={"text"} x={0} y={0} />
      <Panel type={"text"} x={0} y={9} />
    </Panels>
  </Dashboard>
);

export default CustomDashboard;
```

Instead of using comments, you can alternatively configure Babel to handle this pragma usage for you.

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "pragma": "createObject"
      }
    ]
  ]
}
```

Check out the source of this repository for inspiration:

- [./src/.babelrc](./src/.babelrc)
- [./test/.babelrc](./test/.babelrc)

## Developing

### Install

```console
yarn install --frozen-lockfile
```

### Build

```console
yarn build
```

### Test

```console
yarn test
```

### Lint

```console
yarn lint
```

## Contributing

Please check out the [CONTRIBUTING](./docs/CONTRIBUTING.md) docs.

## Changelog

Please check out the [CHANGELOG](./docs/CHANGELOG.md) docs.
