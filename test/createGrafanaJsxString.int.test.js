/** @jsx createObject */

import {
  Annotation,
  Annotations,
  Dashboard,
  Link,
  Links,
  Panel,
  Panels,
  Template,
  Templates,
  Time,
  TimePicker,
  createGrafanaJsxString,
  createObject,
} from "../src";

describe("Integration: createGrafanaJsxString", () => {
  describe("when given a default dashboard JSON", () => {
    it("should transform Grafana JSON to JSX", () => {
      expect(
        createGrafanaJsxString(<Dashboard title={"test-title"} />)
      ).toEqual(
        `<Dashboard editable={true} graphTooltip={0} hideControls={false} id={null} style={"dark"} tags={[]} timezone={"browser"} title={"test-title"}>
<Annotations>
<Annotation builtIn={1} datasource={"-- Grafana --"} enable={true} hide={true} iconColor={"rgba(0, 211, 255, 1)"} name={"Annotations & Alerts"} type={"dashboard"} />
</Annotations>
<Links />
<Panels />
<Templates enable={true} />
<Time from={"now-6h"} to={"now"} />
<TimePicker collapse={false} enable={true} notice={false} now={true} refresh_intervals={["5s","10s","30s","1m","5m","15m","30m","1h","2h","1d"]} status={"Stable"} time_options={["5m","15m","1h","6h","12h","24h","2d","7d","30d"]} type={"timepicker"} />
</Dashboard>`
      );
    });
  });

  describe("when given a custom dashboard JSON", () => {
    it("should transform Grafana JSON to JSX", () => {
      expect(
        createGrafanaJsxString(
          <Dashboard title={"test-dashboard"}>
            <Annotations>
              <Annotation
                builtIn={0}
                datasource={"test-datasource-1"}
                name={"test-name-1"}
              />
              <Annotation
                builtIn={1}
                datasource={"test-datasource-2"}
                name={"test-name-2"}
              />
            </Annotations>
            <Links>
              <Link />
            </Links>
            <Panels>
              <Panel type={"test-type-1"} x={0} y={0} />
              <Panel type={"test-type-2"} x={0} y={9} />
            </Panels>
            <Templates>
              <Template />
            </Templates>
            <Time from={"now-12h"} to={"now-6h"} />
            <TimePicker />
          </Dashboard>
        )
      )
        .toEqual(`<Dashboard editable={true} graphTooltip={0} hideControls={false} id={null} style={"dark"} tags={[]} timezone={"browser"} title={"test-dashboard"}>
<Annotations>
<Annotation builtIn={0} datasource={"test-datasource-1"} enable={true} hide={true} iconColor={"rgba(0, 211, 255, 1)"} name={"test-name-1"} type={"dashboard"} />
<Annotation builtIn={1} datasource={"test-datasource-2"} enable={true} hide={true} iconColor={"rgba(0, 211, 255, 1)"} name={"test-name-2"} type={"dashboard"} />
</Annotations>
<Links>
<Link icon={"external link"} tags={[]} type={"dashboards"} />
</Links>
<Panels>
<Panel type={"test-type-1"} x={0} y={0} width={12} height={9} />
<Panel type={"test-type-2"} x={0} y={9} width={12} height={9} />
</Panels>
<Templates enable={true}>
<Template allFormat={null} allValue={null} hide={0} includeAll={false} label={null} multi={false} options={[]} refresh={0} skipUrlSync={false} sort={0} tags={[]} useTags={false} />
</Templates>
<Time from={"now-12h"} to={"now-6h"} />
<TimePicker collapse={false} enable={true} notice={false} now={true} refresh_intervals={["5s","10s","30s","1m","5m","15m","30m","1h","2h","1d"]} status={"Stable"} time_options={["5m","15m","1h","6h","12h","24h","2d","7d","30d"]} type={"timepicker"} />
</Dashboard>`);
    });
  });
});
