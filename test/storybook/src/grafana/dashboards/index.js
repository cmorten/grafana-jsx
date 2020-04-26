import StorybookDashboard from "./StorybookDashboard";
import fs from "fs";
import path from "path";

fs.writeFileSync(
  path.join(__dirname, "storybook.json"),
  JSON.stringify(<StorybookDashboard />, undefined, 2)
);
