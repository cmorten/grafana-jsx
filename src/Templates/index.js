import PropTypes from "prop-types";

const Templates = ({ children, enable = true, ...props }) => (
  <templating enable={enable} list={children} {...props} />
);

Templates.PropTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
  enable: PropTypes.bool,
};

export default Templates;
