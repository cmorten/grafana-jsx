/**
 * REF: https://grafana.com/docs/grafana/latest/reference/dashboard/#json-fields
 */

import PropTypes from "prop-types";
import Annotation from "../Annotation";
import Annotations from "../Annotations";
import Links from "../Links";
import Panels from "../Panels";
import Templates from "../Templates";
import Time from "../Time";
import TimePicker from "../TimePicker";

const Dashboard = ({
  children,
  editable = true,
  hideControls = false,
  graphTooltip = 0,
  refresh,
  style = "dark",
  tags = [],
  title,
  timezone = "browser",
  uid,
  ...props
}) => (
  <dashboard
    editable={editable}
    graphTooltip={graphTooltip}
    hideControls={hideControls}
    id={null}
    refresh={refresh}
    style={style}
    tags={tags}
    timezone={timezone}
    title={title}
    uid={uid}
    {...props}
  >
    <Annotations>
      <Annotation />
    </Annotations>
    <Links />
    <Panels />
    <Templates />
    <Time />
    <TimePicker />
    {children}
  </dashboard>
);

Dashboard.PropTypes = {
  children: PropTypes.any,
  editable: PropTypes.bool,
  hideControls: PropTypes.bool,
  graphTooltip: PropTypes.oneOf([0, 1, 2]),
  refresh: PropTypes.string,
  style: PropTypes.oneOf(["dark", "light"]),
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  timezone: PropTypes.oneOf(["browser", "utc"]),
  uid: PropTypes.string,
};

export default Dashboard;
