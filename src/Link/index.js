import PropTypes from "prop-types";

const Link = ({
  icon = "external link",
  tags = [],
  type = "dashboards",
  ...props
}) => <link icon={icon} tags={tags} type={type} {...props} />;

Link.PropTypes = {
  icon: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
};

export default Link;
