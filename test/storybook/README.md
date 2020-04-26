# grafana-jsx-storybook

A Grafana setup demonstrating dashboard creation and provisioning using `grafana-jsx`.

## Contents

<!-- toc -->

- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Dashboard JSX](#dashboard-jsx)

<!-- tocstop -->

## Prerequisites

This setup uses [Docker Compose](https://docs.docker.com/compose/) and therefore you will need to have installed both [Docker](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/install/) before you can launch the Grafana JSX Storybook.

## Usage

To start the Grafana instance run:

```console
yarn start
```

This will:

1. Build the dashboard JSON from JSX;
2. Start [Grafana](https://grafana.com/) (on port `3000`), [Prometheus](https://prometheus.io/docs/introduction/overview/) (on port `9090`) and [Node Exporter](https://github.com/prometheus/node_exporter) containers using [Docker Compose](https://docs.docker.com/compose/);
3. Provision the datasource and dashboards for the Grafana instance;

To view the Grafana JSX Storybook dashboard, open <http://localhost:3000> in a browser.

## Dashboard JSX

The dashboard JSX can be found under [./src/grafana/dashboards/](./src/grafana/dashboards/).
