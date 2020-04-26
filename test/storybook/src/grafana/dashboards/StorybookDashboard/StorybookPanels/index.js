import { Panel, Panels, Row } from "local-lib-grafana-jsx";
import nameToVariable from "../nameToVariable";

const StorybookPanels = ({ prometheusDatasourceName }) => {
  const prometheusDatasource = nameToVariable(prometheusDatasourceName);

  return (
    <Panels>
      <Row
        collapsed={false}
        datasource={prometheusDatasource}
        title={"Quick CPU / Mem / Disk"}
        y={0}
      >
        <Panel
          datasource={prometheusDatasource}
          description={"Busy state of all CPU cores together"}
          height={4}
          options={{
            fieldOptions: {
              calcs: ["lastNotNull"],
              defaults: {
                color: { mode: "thresholds" },
                mappings: [
                  { id: 0, op: "=", text: "N/A", type: 1, value: "null" },
                ],
                max: 100,
                min: 0,
                nullValueMode: "null",
                thresholds: {
                  mode: "absolute",
                  steps: [
                    { color: "rgba(50, 172, 45, 0.97)", value: null },
                    { color: "rgba(237, 129, 40, 0.89)", value: 85 },
                    { color: "rgba(245, 54, 54, 0.9)", value: 95 },
                  ],
                },
                unit: "percent",
              },
              overrides: [],
              values: false,
            },
            orientation: "horizontal",
            showThresholdLabels: false,
            showThresholdMarkers: true,
          }}
          targets={[
            {
              expr:
                '(((count(count(node_cpu_seconds_total{instance=~"$node:$port",job=~"$job"}) by (cpu))) - avg(sum by (mode)(irate(node_cpu_seconds_total{mode=\'idle\',instance=~"$node:$port",job=~"$job"}[5m])))) * 100) / count(count(node_cpu_seconds_total{instance=~"$node:$port",job=~"$job"}) by (cpu))',
              hide: false,
              intervalFactor: 1,
              legendFormat: "",
              refId: "A",
              step: 900,
            },
          ]}
          title={"CPU Busy"}
          type={"gauge"}
          width={3}
          x={0}
          y={1}
        />
        <Panel
          datasource={prometheusDatasource}
          description={"Busy state of all CPU cores together (5 min average)"}
          height={4}
          options={{
            fieldOptions: {
              calcs: ["lastNotNull"],
              defaults: {
                color: { mode: "thresholds" },
                mappings: [
                  { id: 0, op: "=", text: "N/A", type: 1, value: "null" },
                ],
                max: 100,
                min: 0,
                nullValueMode: "null",
                thresholds: {
                  mode: "absolute",
                  steps: [
                    { color: "rgba(50, 172, 45, 0.97)", value: null },
                    { color: "rgba(237, 129, 40, 0.89)", value: 85 },
                    { color: "rgba(245, 54, 54, 0.9)", value: 95 },
                  ],
                },
                unit: "percent",
              },
              overrides: [],
              values: false,
            },
            orientation: "horizontal",
            showThresholdLabels: false,
            showThresholdMarkers: true,
          }}
          targets={[
            {
              expr:
                'avg(node_load5{instance=~"$node:$port",job=~"$job"}) /  count(count(node_cpu_seconds_total{instance=~"$node:$port",job=~"$job"}) by (cpu)) * 100',
              format: "time_series",
              hide: false,
              intervalFactor: 1,
              refId: "A",
              step: 900,
            },
          ]}
          title={"Sys Load (5m avg)"}
          type={"gauge"}
          width={3}
          x={3}
          y={1}
        />
        <Panel
          datasource={prometheusDatasource}
          description={"Busy state of all CPU cores together (15 min average)"}
          height={4}
          options={{
            fieldOptions: {
              calcs: ["lastNotNull"],
              defaults: {
                color: { mode: "thresholds" },
                mappings: [
                  { id: 0, op: "=", text: "N/A", type: 1, value: "null" },
                ],
                max: 100,
                min: 0,
                nullValueMode: "null",
                thresholds: {
                  mode: "absolute",
                  steps: [
                    { color: "rgba(50, 172, 45, 0.97)", value: null },
                    { color: "rgba(237, 129, 40, 0.89)", value: 85 },
                    { color: "rgba(245, 54, 54, 0.9)", value: 95 },
                  ],
                },
                unit: "percent",
              },
              overrides: [],
              values: false,
            },
            orientation: "horizontal",
            showThresholdLabels: false,
            showThresholdMarkers: true,
          }}
          targets={[
            {
              expr:
                'avg(node_load15{instance=~"$node:$port",job=~"$job"}) /  count(count(node_cpu_seconds_total{instance=~"$node:$port",job=~"$job"}) by (cpu)) * 100',
              hide: false,
              intervalFactor: 1,
              refId: "A",
              step: 900,
            },
          ]}
          title={"Sys Load (15m avg)"}
          type={"gauge"}
          width={3}
          x={6}
          y={1}
        />
        <Panel
          datasource={prometheusDatasource}
          description={"Non available RAM memory"}
          height={4}
          hideTimeOverride={false}
          options={{
            fieldOptions: {
              calcs: ["lastNotNull"],
              defaults: {
                color: { mode: "thresholds" },
                decimals: 0,
                mappings: [],
                max: 100,
                min: 0,
                nullValueMode: "null",
                thresholds: {
                  mode: "absolute",
                  steps: [
                    { color: "rgba(50, 172, 45, 0.97)", value: null },
                    { color: "rgba(237, 129, 40, 0.89)", value: 80 },
                    { color: "rgba(245, 54, 54, 0.9)", value: 90 },
                  ],
                },
                unit: "percent",
              },
              overrides: [],
              values: false,
            },
            orientation: "horizontal",
            showThresholdLabels: false,
            showThresholdMarkers: true,
          }}
          targets={[
            {
              expr:
                '((node_memory_MemTotal_bytes{instance=~"$node:$port",job=~"$job"} - node_memory_MemFree_bytes{instance=~"$node:$port",job=~"$job"}) / (node_memory_MemTotal_bytes{instance=~"$node:$port",job=~"$job"} )) * 100',
              format: "time_series",
              hide: true,
              intervalFactor: 1,
              refId: "A",
              step: 900,
            },
            {
              expr:
                '100 - ((node_memory_MemAvailable_bytes{instance=~"$node:$port",job=~"$job"} * 100) / node_memory_MemTotal_bytes{instance=~"$node:$port",job=~"$job"})',
              format: "time_series",
              hide: false,
              intervalFactor: 1,
              refId: "B",
              step: 900,
            },
          ]}
          title={"RAM Used"}
          type={"gauge"}
          width={3}
          x={9}
          y={1}
        />
        <Panel
          datasource={prometheusDatasource}
          description={"Used Swap"}
          height={4}
          options={{
            fieldOptions: {
              calcs: ["lastNotNull"],
              defaults: {
                color: { mode: "thresholds" },
                mappings: [
                  { id: 0, op: "=", text: "N/A", type: 1, value: "null" },
                ],
                max: 100,
                min: 0,
                nullValueMode: "null",
                thresholds: {
                  mode: "absolute",
                  steps: [
                    { color: "rgba(50, 172, 45, 0.97)", value: null },
                    { color: "rgba(237, 129, 40, 0.89)", value: 10 },
                    { color: "rgba(245, 54, 54, 0.9)", value: 25 },
                  ],
                },
                unit: "percent",
              },
              overrides: [],
              values: false,
            },
            orientation: "horizontal",
            showThresholdLabels: false,
            showThresholdMarkers: true,
          }}
          targets={[
            {
              expr:
                '((node_memory_SwapTotal_bytes{instance=~"$node:$port",job=~"$job"} - node_memory_SwapFree_bytes{instance=~"$node:$port",job=~"$job"}) / (node_memory_SwapTotal_bytes{instance=~"$node:$port",job=~"$job"} )) * 100',
              intervalFactor: 1,
              refId: "A",
              step: 900,
            },
          ]}
          title={"SWAP Used"}
          type={"gauge"}
          width={3}
          x={12}
          y={1}
        />
        <Panel
          datasource={prometheusDatasource}
          description={"Used Root FS"}
          height={4}
          options={{
            fieldOptions: {
              calcs: ["lastNotNull"],
              defaults: {
                color: { mode: "thresholds" },
                mappings: [
                  { id: 0, op: "=", text: "N/A", type: 1, value: "null" },
                ],
                max: 100,
                min: 0,
                nullValueMode: "null",
                thresholds: {
                  mode: "absolute",
                  steps: [
                    { color: "rgba(50, 172, 45, 0.97)", value: null },
                    { color: "rgba(237, 129, 40, 0.89)", value: 80 },
                    { color: "rgba(245, 54, 54, 0.9)", value: 90 },
                  ],
                },
                unit: "percent",
              },
              overrides: [],
              values: false,
            },
            orientation: "horizontal",
            showThresholdLabels: false,
            showThresholdMarkers: true,
          }}
          targets={[
            {
              expr:
                '100 - ((node_filesystem_avail_bytes{instance=~"$node:$port",job=~"$job",mountpoint="/",fstype!="rootfs"} * 100) / node_filesystem_size_bytes{instance=~"$node:$port",job=~"$job",mountpoint="/",fstype!="rootfs"})',
              format: "time_series",
              intervalFactor: 1,
              refId: "A",
              step: 900,
            },
          ]}
          title={"Root FS Used"}
          type={"gauge"}
          width={3}
          x={15}
          y={1}
        />
        <Panel
          colorBackground={false}
          colors={[
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)",
          ]}
          colorValue={false}
          datasource={prometheusDatasource}
          description={"Total number of CPU cores"}
          format={"short"}
          gauge={{
            maxValue: 100,
            minValue: 0,
            show: false,
            thresholdLabels: false,
            thresholdMarkers: true,
          }}
          height={2}
          interval={null}
          mappingType={1}
          mappingTypes={[
            { name: "value to text", value: 1 },
            { name: "range to text", value: 2 },
          ]}
          maxDataPoints={100}
          maxPerRow={6}
          nullPointMode={"null"}
          nullText={null}
          postfix={""}
          postfixFontSize={"50%"}
          prefix={""}
          prefixFontSize={"50%"}
          rangeMaps={[{ from: "null", text: "N/A", to: "null" }]}
          sparkline={{
            fillColor: "rgba(31, 118, 189, 0.18)",
            full: false,
            lineColor: "rgb(31, 120, 193)",
            show: false,
          }}
          tableColumn={""}
          targets={[
            {
              expr:
                'count(count(node_cpu_seconds_total{instance=~"$node:$port",job=~"$job"}) by (cpu))',
              interval: "",
              intervalFactor: 1,
              legendFormat: "",
              refId: "A",
              step: 900,
            },
          ]}
          thresholds={""}
          title={"CPU Cores"}
          type={"singlestat"}
          valueFontSize={"50%"}
          valueMaps={[{ op: "=", text: "N/A", value: "null" }]}
          valueName={"current"}
          width={2}
          x={18}
          y={1}
        />
        <Panel
          colorBackground={false}
          colors={[
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)",
          ]}
          colorValue={false}
          datasource={prometheusDatasource}
          decimals={1}
          description={"System uptime"}
          format={"s"}
          gauge={{
            maxValue: 100,
            minValue: 0,
            show: false,
            thresholdLabels: false,
            thresholdMarkers: true,
          }}
          height={2}
          hideTimeOverride={true}
          interval={null}
          mappingType={1}
          mappingTypes={[
            { $$hashKey: "object:1094", name: "value to text", value: 1 },
            { $$hashKey: "object:1095", name: "range to text", value: 2 },
          ]}
          maxDataPoints={100}
          nullPointMode={"null"}
          nullText={null}
          postfix={"s"}
          postfixFontSize={"50%"}
          prefix={""}
          prefixFontSize={"50%"}
          rangeMaps={[{ from: "null", text: "N/A", to: "null" }]}
          sparkline={{
            fillColor: "rgba(31, 118, 189, 0.18)",
            full: false,
            lineColor: "rgb(31, 120, 193)",
            show: false,
          }}
          tableColumn={""}
          targets={[
            {
              expr:
                'node_time_seconds{instance=~"$node:$port",job=~"$job"} - node_boot_time_seconds{instance=~"$node:$port",job=~"$job"}',
              intervalFactor: 2,
              refId: "A",
              step: 1800,
            },
          ]}
          thresholds={""}
          title={"Uptime"}
          type={"singlestat"}
          valueFontSize={"50%"}
          valueMaps={[
            { $$hashKey: "object:1097", op: "=", text: "N/A", value: "null" },
          ]}
          valueName={"current"}
          width={4}
          x={20}
          y={1}
        />
        <Panel
          colorBackground={false}
          colors={[
            "rgba(50, 172, 45, 0.97)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(245, 54, 54, 0.9)",
          ]}
          colorValue={false}
          datasource={prometheusDatasource}
          decimals={0}
          description={"Total RootFS"}
          format={"bytes"}
          gauge={{
            maxValue: 100,
            minValue: 0,
            show: false,
            thresholdLabels: false,
            thresholdMarkers: true,
          }}
          height={2}
          interval={null}
          mappingType={1}
          mappingTypes={[
            { name: "value to text", value: 1 },
            { name: "range to text", value: 2 },
          ]}
          maxDataPoints={100}
          maxPerRow={6}
          nullPointMode={"null"}
          nullText={null}
          postfix={""}
          postfixFontSize={"50%"}
          prefix={""}
          prefixFontSize={"50%"}
          rangeMaps={[{ from: "null", text: "N/A", to: "null" }]}
          sparkline={{
            fillColor: "rgba(31, 118, 189, 0.18)",
            full: false,
            lineColor: "rgb(31, 120, 193)",
            show: false,
          }}
          tableColumn={""}
          targets={[
            {
              expr:
                'node_filesystem_size_bytes{instance=~"$node:$port",job=~"$job",mountpoint="/",fstype!="rootfs"}',
              format: "time_series",
              hide: false,
              intervalFactor: 1,
              refId: "A",
              step: 900,
            },
          ]}
          thresholds={"70,90"}
          title={"RootFS Total"}
          type={"singlestat"}
          valueFontSize={"50%"}
          valueMaps={[{ op: "=", text: "N/A", value: "null" }]}
          valueName={"current"}
          width={2}
          x={18}
          y={3}
        />
        <Panel
          colorBackground={false}
          colors={[
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)",
          ]}
          colorValue={false}
          datasource={prometheusDatasource}
          decimals={0}
          description={"Total RAM"}
          format={"bytes"}
          gauge={{
            maxValue: 100,
            minValue: 0,
            show: false,
            thresholdLabels: false,
            thresholdMarkers: true,
          }}
          height={2}
          interval={null}
          mappingType={1}
          mappingTypes={[
            { name: "value to text", value: 1 },
            { name: "range to text", value: 2 },
          ]}
          maxDataPoints={100}
          maxPerRow={6}
          nullPointMode={"null"}
          nullText={null}
          postfix={""}
          postfixFontSize={"70%"}
          prefix={""}
          prefixFontSize={"50%"}
          rangeMaps={[{ from: "null", text: "N/A", to: "null" }]}
          sparkline={{
            fillColor: "rgba(31, 118, 189, 0.18)",
            full: false,
            lineColor: "rgb(31, 120, 193)",
            show: false,
          }}
          tableColumn={""}
          targets={[
            {
              expr:
                'node_memory_MemTotal_bytes{instance=~"$node:$port",job=~"$job"}',
              intervalFactor: 1,
              refId: "A",
              step: 900,
            },
          ]}
          thresholds={""}
          title={"RAM Total"}
          type={"singlestat"}
          valueFontSize={"50%"}
          valueMaps={[{ op: "=", text: "N/A", value: "null" }]}
          valueName={"current"}
          width={2}
          x={20}
          y={3}
        />
        <Panel
          colorBackground={false}
          colors={[
            "rgba(245, 54, 54, 0.9)",
            "rgba(237, 129, 40, 0.89)",
            "rgba(50, 172, 45, 0.97)",
          ]}
          colorValue={false}
          datasource={prometheusDatasource}
          decimals={0}
          description={"Total SWAP"}
          format={"bytes"}
          gauge={{
            maxValue: 100,
            minValue: 0,
            show: false,
            thresholdLabels: false,
            thresholdMarkers: true,
          }}
          height={2}
          interval={null}
          mappingType={1}
          mappingTypes={[
            { name: "value to text", value: 1 },
            { name: "range to text", value: 2 },
          ]}
          maxDataPoints={100}
          maxPerRow={6}
          nullPointMode={"null"}
          nullText={null}
          postfix={""}
          postfixFontSize={"70%"}
          prefix={""}
          prefixFontSize={"50%"}
          rangeMaps={[{ from: "null", text: "N/A", to: "null" }]}
          sparkline={{
            fillColor: "rgba(31, 118, 189, 0.18)",
            full: false,
            lineColor: "rgb(31, 120, 193)",
            show: false,
          }}
          tableColumn={""}
          targets={[
            {
              expr:
                'node_memory_SwapTotal_bytes{instance=~"$node:$port",job=~"$job"}',
              intervalFactor: 1,
              refId: "A",
              step: 900,
            },
          ]}
          thresholds={""}
          title={"SWAP Total"}
          type={"singlestat"}
          valueFontSize={"50%"}
          valueMaps={[{ op: "=", text: "N/A", value: "null" }]}
          valueName={"current"}
          width={2}
          x={22}
          y={3}
        />
      </Row>
      <Row
        collapsed={true}
        datasource={prometheusDatasource}
        title={"Basic CPU / Mem / Net / Disk"}
        y={5}
      >
        <Panel
          aliasColors={{
            Busy: "#EAB839",
            "Busy Iowait": "#890F02",
            "Busy other": "#1F78C1",
            Idle: "#052B51",
            "Idle - Waiting for something to happen": "#052B51",
            guest: "#9AC48A",
            idle: "#052B51",
            iowait: "#EAB839",
            irq: "#BF1B00",
            nice: "#C15C17",
            softirq: "#E24D42",
            steal: "#FCE2DE",
            system: "#508642",
            user: "#5195CE",
          }}
          bars={false}
          dashes={false}
          dashLength={10}
          datasource={prometheusDatasource}
          decimals={2}
          description={"Basic CPU info"}
          fill={4}
          fillGradient={0}
          height={7}
          hiddenSeries={false}
          legend={{
            alignAsTable: false,
            avg: false,
            current: false,
            max: false,
            min: false,
            rightSide: false,
            show: true,
            sideWidth: 250,
            sort: null,
            sortDesc: null,
            total: false,
            values: false,
          }}
          lines={true}
          linewidth={1}
          maxPerRow={6}
          nullPointMode={"null"}
          options={{ dataLinks: [] }}
          percentage={true}
          pointradius={5}
          points={false}
          renderer={"flot"}
          seriesOverrides={[
            { alias: "Busy Iowait", color: "#890F02" },
            { alias: "Idle", color: "#7EB26D" },
            { alias: "Busy System", color: "#EAB839" },
            { alias: "Busy User", color: "#0A437C" },
            { alias: "Busy Other", color: "#6D1F62" },
          ]}
          spaceLength={10}
          stack={true}
          steppedLine={false}
          targets={[
            {
              expr:
                'sum by (instance)(irate(node_cpu_seconds_total{mode="system",instance=~"$node:$port",job=~"$job"}[5m])) * 100',
              format: "time_series",
              hide: false,
              intervalFactor: 2,
              legendFormat: "Busy System",
              refId: "A",
              step: 240,
            },
            {
              expr:
                'sum by (instance)(irate(node_cpu_seconds_total{mode=\'user\',instance=~"$node:$port",job=~"$job"}[5m])) * 100',
              format: "time_series",
              hide: false,
              intervalFactor: 2,
              legendFormat: "Busy User",
              refId: "B",
              step: 240,
            },
            {
              expr:
                'sum by (instance)(irate(node_cpu_seconds_total{mode=\'iowait\',instance=~"$node:$port",job=~"$job"}[5m])) * 100',
              format: "time_series",
              intervalFactor: 2,
              legendFormat: "Busy Iowait",
              refId: "C",
              step: 240,
            },
            {
              expr:
                'sum by (instance)(irate(node_cpu_seconds_total{mode=~".*irq",instance=~"$node:$port",job=~"$job"}[5m])) * 100',
              format: "time_series",
              intervalFactor: 2,
              legendFormat: "Busy IRQs",
              refId: "D",
              step: 240,
            },
            {
              expr:
                "sum (irate(node_cpu_seconds_total{mode!='idle',mode!='user',mode!='system',mode!='iowait',mode!='irq',mode!='softirq',instance=~\"$node:$port\",job=~\"$job\"}[5m])) * 100",
              format: "time_series",
              intervalFactor: 2,
              legendFormat: "Busy Other",
              refId: "E",
              step: 240,
            },
            {
              expr:
                'sum by (mode)(irate(node_cpu_seconds_total{mode=\'idle\',instance=~"$node:$port",job=~"$job"}[5m])) * 100',
              format: "time_series",
              intervalFactor: 2,
              legendFormat: "Idle",
              refId: "F",
              step: 240,
            },
          ]}
          thresholds={[]}
          timeFrom={null}
          timeRegions={[]}
          timeShift={null}
          title={"CPU Basic"}
          tooltip={{ shared: true, sort: 0, value_type: "individual" }}
          type={"graph"}
          width={12}
          x={0}
          xaxis={{
            buckets: null,
            mode: "time",
            name: null,
            show: true,
            values: [],
          }}
          y={6}
          yaxes={[
            {
              format: "short",
              label: "",
              logBase: 1,
              max: "100",
              min: "0",
              show: true,
            },
            {
              format: "short",
              label: null,
              logBase: 1,
              max: null,
              min: null,
              show: false,
            },
          ]}
          yaxis={{ align: false, alignLevel: null }}
        />
        <Panel
          aliasColors={{
            Apps: "#629E51",
            Buffers: "#614D93",
            Cache: "#6D1F62",
            Cached: "#511749",
            Committed: "#508642",
            Free: "#0A437C",
            "Hardware Corrupted - Amount of RAM that the kernel identified as corrupted / not working":
              "#CFFAFF",
            Inactive: "#584477",
            PageTables: "#0A50A1",
            Page_Tables: "#0A50A1",
            RAM_Free: "#E0F9D7",
            "SWAP Used": "#BF1B00",
            Slab: "#806EB7",
            Slab_Cache: "#E0752D",
            Swap: "#BF1B00",
            "Swap Used": "#BF1B00",
            Swap_Cache: "#C15C17",
            Swap_Free: "#2F575E",
            Unused: "#EAB839",
          }}
          bars={false}
          dashes={false}
          dashLength={10}
          datasource={prometheusDatasource}
          decimals={2}
          description={"Basic memory usage"}
          fill={4}
          fillGradient={0}
          height={7}
          hiddenSeries={false}
          legend={{
            alignAsTable: false,
            avg: false,
            current: false,
            max: false,
            min: false,
            rightSide: false,
            show: true,
            sideWidth: 350,
            total: false,
            values: false,
          }}
          lines={true}
          linewidth={1}
          maxPerRow={6}
          nullPointMode={"null"}
          options={{ dataLinks: [] }}
          percentage={false}
          pointradius={5}
          points={false}
          renderer={"flot"}
          seriesOverrides={[
            { alias: "RAM Total", color: "#E0F9D7", fill: 0, stack: false },
            { alias: "RAM Cache + Buffer", color: "#052B51" },
            { alias: "RAM Free", color: "#7EB26D" },
            { alias: "Avaliable", color: "#DEDAF7", fill: 0, stack: false },
          ]}
          spaceLength={10}
          stack={true}
          steppedLine={false}
          targets={[
            {
              expr:
                'node_memory_MemTotal_bytes{instance=~"$node:$port",job=~"$job"}',
              format: "time_series",
              hide: false,
              intervalFactor: 2,
              legendFormat: "RAM Total",
              refId: "A",
              step: 240,
            },
            {
              expr:
                'node_memory_MemTotal_bytes{instance=~"$node:$port",job=~"$job"} - node_memory_MemFree_bytes{instance=~"$node:$port",job=~"$job"} - (node_memory_Cached_bytes{instance=~"$node:$port",job=~"$job"} + node_memory_Buffers_bytes{instance=~"$node:$port",job=~"$job"})',
              format: "time_series",
              hide: false,
              intervalFactor: 2,
              legendFormat: "RAM Used",
              refId: "B",
              step: 240,
            },
            {
              expr:
                'node_memory_Cached_bytes{instance=~"$node:$port",job=~"$job"} + node_memory_Buffers_bytes{instance=~"$node:$port",job=~"$job"}',
              format: "time_series",
              intervalFactor: 2,
              legendFormat: "RAM Cache + Buffer",
              refId: "C",
              step: 240,
            },
            {
              expr:
                'node_memory_MemFree_bytes{instance=~"$node:$port",job=~"$job"}',
              format: "time_series",
              intervalFactor: 2,
              legendFormat: "RAM Free",
              refId: "D",
              step: 240,
            },
            {
              expr:
                '(node_memory_SwapTotal_bytes{instance=~"$node:$port",job=~"$job"} - node_memory_SwapFree_bytes{instance=~"$node:$port",job=~"$job"})',
              format: "time_series",
              intervalFactor: 2,
              legendFormat: "SWAP Used",
              refId: "E",
              step: 240,
            },
          ]}
          thresholds={[]}
          timeFrom={null}
          timeRegions={[]}
          timeShift={null}
          title={"Memory Basic"}
          tooltip={{ shared: true, sort: 0, value_type: "individual" }}
          type={"graph"}
          width={12}
          x={12}
          xaxis={{
            buckets: null,
            mode: "time",
            name: null,
            show: true,
            values: [],
          }}
          y={6}
          yaxes={[
            {
              format: "bytes",
              label: "",
              logBase: 1,
              max: null,
              min: "0",
              show: true,
            },
            {
              format: "short",
              label: null,
              logBase: 1,
              max: null,
              min: null,
              show: false,
            },
          ]}
          yaxis={{ align: false, alignLevel: null }}
        />
        <Panel
          aliasColors={{
            Recv_bytes_eth2: "#7EB26D",
            Recv_bytes_lo: "#0A50A1",
            Recv_drop_eth2: "#6ED0E0",
            Recv_drop_lo: "#E0F9D7",
            Recv_errs_eth2: "#BF1B00",
            Recv_errs_lo: "#CCA300",
            Trans_bytes_eth2: "#7EB26D",
            Trans_bytes_lo: "#0A50A1",
            Trans_drop_eth2: "#6ED0E0",
            Trans_drop_lo: "#E0F9D7",
            Trans_errs_eth2: "#BF1B00",
            Trans_errs_lo: "#CCA300",
            recv_bytes_lo: "#0A50A1",
            recv_drop_eth0: "#99440A",
            recv_drop_lo: "#967302",
            recv_errs_eth0: "#BF1B00",
            recv_errs_lo: "#890F02",
            trans_bytes_eth0: "#7EB26D",
            trans_bytes_lo: "#0A50A1",
            trans_drop_eth0: "#99440A",
            trans_drop_lo: "#967302",
            trans_errs_eth0: "#BF1B00",
            trans_errs_lo: "#890F02",
          }}
          bars={false}
          dashes={false}
          dashLength={10}
          datasource={prometheusDatasource}
          description={"Basic network info per interface"}
          fill={4}
          fillGradient={0}
          height={7}
          hiddenSeries={false}
          legend={{
            alignAsTable: false,
            avg: false,
            current: false,
            hideEmpty: false,
            hideZero: false,
            max: false,
            min: false,
            rightSide: false,
            show: true,
            sort: "current",
            sortDesc: true,
            total: false,
            values: false,
          }}
          lines={true}
          linewidth={1}
          nullPointMode={"null"}
          options={{ dataLinks: [] }}
          percentage={false}
          pointradius={5}
          points={false}
          renderer={"flot"}
          seriesOverrides={[{ alias: "/.*trans.*/", transform: "negative-Y" }]}
          spaceLength={10}
          stack={false}
          steppedLine={false}
          targets={[
            {
              expr:
                'irate(node_network_receive_bytes_total{instance=~"$node:$port",job=~"$job"}[5m])*8',
              format: "time_series",
              intervalFactor: 2,
              legendFormat: "recv {{device}}",
              refId: "A",
              step: 240,
            },
            {
              expr:
                'irate(node_network_transmit_bytes_total{instance=~"$node:$port",job=~"$job"}[5m])*8',
              format: "time_series",
              intervalFactor: 2,
              legendFormat: "trans {{device}} ",
              refId: "B",
              step: 240,
            },
          ]}
          thresholds={[]}
          timeFrom={null}
          timeRegions={[]}
          timeShift={null}
          title={"Network Traffic Basic"}
          tooltip={{ shared: true, sort: 0, value_type: "individual" }}
          type={"graph"}
          width={12}
          x={0}
          xaxis={{
            buckets: null,
            mode: "time",
            name: null,
            show: true,
            values: [],
          }}
          y={13}
          yaxes={[
            {
              format: "bps",
              label: null,
              logBase: 1,
              max: null,
              min: null,
              show: true,
            },
            {
              format: "pps",
              label: "",
              logBase: 1,
              max: null,
              min: null,
              show: false,
            },
          ]}
          yaxis={{ align: false, alignLevel: null }}
        />
        <Panel
          aliasColors={{}}
          bars={false}
          dashes={false}
          dashLength={10}
          datasource={prometheusDatasource}
          decimals={3}
          description={"Disk space used of all filesystems mounted"}
          fill={4}
          fillGradient={0}
          height={7}
          hiddenSeries={false}
          legend={{
            alignAsTable: false,
            avg: false,
            current: false,
            max: false,
            min: false,
            rightSide: false,
            show: true,
            sort: "current",
            sortDesc: false,
            total: false,
            values: false,
          }}
          lines={true}
          linewidth={1}
          maxPerRow={6}
          nullPointMode={"null"}
          options={{ dataLinks: [] }}
          percentage={false}
          pointradius={5}
          points={false}
          renderer={"flot"}
          seriesOverrides={[]}
          spaceLength={10}
          stack={false}
          steppedLine={false}
          targets={[
            {
              expr:
                '100 - ((node_filesystem_avail_bytes{instance=~"$node:$port",job=~"$job",device!~\'rootfs\'} * 100) / node_filesystem_size_bytes{instance=~"$node:$port",job=~"$job",device!~\'rootfs\'})',
              format: "time_series",
              intervalFactor: 2,
              legendFormat: "{{mountpoint}}",
              refId: "A",
              step: 240,
            },
          ]}
          thresholds={[]}
          timeFrom={null}
          timeRegions={[]}
          timeShift={null}
          title={"Disk Space Used Basic"}
          tooltip={{ shared: true, sort: 0, value_type: "individual" }}
          type={"graph"}
          width={12}
          x={12}
          xaxis={{
            buckets: null,
            mode: "time",
            name: null,
            show: true,
            values: [],
          }}
          y={13}
          yaxes={[
            {
              format: "percent",
              label: null,
              logBase: 1,
              max: "100",
              min: "0",
              show: true,
            },
            {
              format: "short",
              label: null,
              logBase: 1,
              max: null,
              min: null,
              show: true,
            },
          ]}
          yaxis={{ align: false, alignLevel: null }}
        />
      </Row>
    </Panels>
  );
};

export default StorybookPanels;
