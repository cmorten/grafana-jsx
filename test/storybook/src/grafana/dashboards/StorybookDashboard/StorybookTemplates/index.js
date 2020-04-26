import { Templates } from "local-lib-grafana-jsx";
import PrometheusTemplate from "./PrometheusTemplate";
import JobTemplate from "./JobTemplate";
import NodeTemplate from "./NodeTemplate";
import InstanceTemplate from "./InstanceTemplate";
import PortTemplate from "./PortTemplate";
import nameToVariable from "../nameToVariable";

const StorybookTemplates = ({ prometheusDatasourceName }) => {
  const prometheusDatasource = nameToVariable(prometheusDatasourceName);

  return (
    <Templates>
      <PrometheusTemplate name={prometheusDatasourceName} />
      <JobTemplate datasource={prometheusDatasource} />
      <NodeTemplate datasource={prometheusDatasource} />
      <InstanceTemplate datasource={prometheusDatasource} />
      <PortTemplate datasource={prometheusDatasource} />
    </Templates>
  );
};

export default StorybookTemplates;
