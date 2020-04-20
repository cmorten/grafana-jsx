import PropTypes from "prop-types";

const Annotations = ({ children, ...props }) => (
  <annotations list={children} {...props} />
);

Annotations.PropTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
};

export default Annotations;
