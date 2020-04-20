/**
 * REF: https://grafana.com/docs/grafana/latest/reference/dashboard/#timepicker
 */

import PropTypes from "prop-types";

const TimePicker = ({
  collapse = false,
  enable = true,
  notice = false,
  now = true,
  refreshIntervals = [
    "5s",
    "10s",
    "30s",
    "1m",
    "5m",
    "15m",
    "30m",
    "1h",
    "2h",
    "1d",
  ],
  timeOptions = ["5m", "15m", "1h", "6h", "12h", "24h", "2d", "7d", "30d"],
  status = "Stable",
  type = "timepicker",
  ...props
}) => (
  <timepicker
    collapse={collapse}
    enable={enable}
    notice={notice}
    now={now}
    refresh_intervals={refreshIntervals}
    status={status}
    time_options={timeOptions}
    type={type}
    {...props}
  />
);

TimePicker.PropTypes = {
  collapse: PropTypes.bool,
  enable: PropTypes.bool,
  notice: PropTypes.bool,
  now: PropTypes.bool,
  refreshIntervals: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.string,
  type: PropTypes.string,
};

export default TimePicker;
