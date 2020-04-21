/**
 * REF: https://grafana.com/docs/grafana/latest/reference/dashboard/#annotations
 */

import PropTypes from "prop-types";

const Annotations = ({ children, ...props }) => (
  <annotations list={children} {...props} />
);

Annotations.PropTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
};

export default Annotations;
