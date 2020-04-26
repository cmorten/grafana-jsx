import { Template } from "local-lib-grafana-jsx";

const JobTemplate = ({ datasource }) => (
  <Template
    datasource={datasource}
    label={"Node"}
    name={"name"}
    query={'label_values(node_uname_info{job=~"$job"}, nodename)'}
    type={"query"}
  />
);

export default JobTemplate;
