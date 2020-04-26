import PropTypes from "prop-types";

const Links = ({ children }) => ({
  links: children,
});

Links.PropTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
};

export default Links;
