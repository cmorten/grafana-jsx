import { Template } from "local-lib-grafana-jsx";

const JobTemplate = ({ datasource }) => (
  <Template
    datasource={datasource}
    label={"Job"}
    name={"job"}
    query={"label_values(node_uname_info, job)"}
    type={"query"}
  />
);

export default JobTemplate;
