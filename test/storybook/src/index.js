const path = require("path");
const { spawnSync } = require("child_process");
const compose = require("docker-compose");
const neverExit = require("never-exit");

const actuallyExit = neverExit();

const configureGrafana = () =>
  spawnSync("bash", ["./src/grafana/setup.sh"], {
    stdio: [0, 1, 2],
  });

compose
  .upAll({
    cwd: path.join(__dirname),
    log: true,
    commandOptions: ["--build", "--force-recreate"],
  })
  .then(configureGrafana, actuallyExit);

process.on("SIGINT", () => {
  compose.down(
    { cwd: path.join(__dirname), log: true },
    actuallyExit,
    actuallyExit
  );
});
