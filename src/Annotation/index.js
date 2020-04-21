/**
 * REF: https://grafana.com/docs/grafana/latest/reference/dashboard/#annotations
 */

import PropTypes from "prop-types";

const Annotation = ({
  builtIn = 1,
  datasource = "-- Grafana --",
  enable = true,
  hide = true,
  iconColor = "rgba(0, 211, 255, 1)",
  name = "Annotations & Alerts",
  type = "dashboard",
  ...props
}) => (
  <annotation
    builtIn={builtIn}
    datasource={datasource}
    enable={enable}
    hide={hide}
    iconColor={iconColor}
    name={name}
    type={type}
    {...props}
  />
);

Annotation.PropTypes = {
  builtIn: PropTypes.oneOf([0, 1]),
};

export default Annotation;
