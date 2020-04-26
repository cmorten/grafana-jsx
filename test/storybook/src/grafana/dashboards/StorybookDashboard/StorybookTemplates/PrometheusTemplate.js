import { Template } from "local-lib-grafana-jsx";

const PrometheusTemplate = ({ name }) => (
  <Template
    current={{ selected: false, text: "Prometheus", value: "Prometheus" }}
    label={"Datasource"}
    name={name}
    query={"prometheus"}
    refresh={2}
    type={"datasource"}
  />
);

export default PrometheusTemplate;
