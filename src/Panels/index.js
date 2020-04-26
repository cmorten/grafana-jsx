import PropTypes from "prop-types";

const Panels = ({ children }) => ({
  panels: children,
});

Panels.PropTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
};

export default Panels;
