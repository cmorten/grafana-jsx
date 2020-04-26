import { Template } from "local-lib-grafana-jsx";

const JobTemplate = ({ datasource }) => (
  <Template
    datasource={datasource}
    label={"Port"}
    name={"port"}
    query={'label_values(node_uname_info{instance=~"$node:(.*)"}, instance)'}
    regex={"/[^:]+:(.*)/"}
    sort={3}
    type={"query"}
  />
);

export default JobTemplate;
