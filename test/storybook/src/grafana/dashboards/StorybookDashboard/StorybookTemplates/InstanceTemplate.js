import { Template } from "local-lib-grafana-jsx";

const JobTemplate = ({ datasource }) => (
  <Template
    datasource={datasource}
    hide={2}
    label={"Instance"}
    name={"node"}
    query={'label_values(node_uname_info{nodename="$name"}, instance)'}
    regex={"/([^:]+):.*/"}
    type={"query"}
  />
);

export default JobTemplate;
