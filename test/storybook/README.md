# grafana-jsx-storybook

A Grafana setup relying on a dashboard created using `grafana-jsx`.

## Usage

To start the Grafana instance run:

```console
yarn start
```

This will:

1. Build the dashboard JSON from JSX;
2. Start Grafana, Prometheus and Node-Exporter containers;
3. Provision the datasource and dashboards for the Grafana instance;

To view the Grafana JSX Storybook dashboard, open <http://localhost:3000> in a browser.

## Dashboard JSX

The dashboard JSX can be found under [./src/grafana/dashboards/](./src/grafana/dashboards/).
