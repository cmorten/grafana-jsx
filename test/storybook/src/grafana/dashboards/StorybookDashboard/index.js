import { Dashboard } from "local-lib-grafana-jsx";
import StorybookPanels from "./StorybookPanels";
import StorybookTemplates from "./StorybookTemplates";

const prometheusDatasourceName = "DS_PROMETHEUS";

const StorybookDashboard = () => (
  <Dashboard
    style={"light"}
    tags={["Storybook"]}
    title={"Grafana JSX Storybook"}
  >
    <StorybookTemplates prometheusDatasourceName={prometheusDatasourceName} />
    <StorybookPanels prometheusDatasourceName={prometheusDatasourceName} />
  </Dashboard>
);

export default StorybookDashboard;
