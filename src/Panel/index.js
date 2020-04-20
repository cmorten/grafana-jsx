import PropTypes from "prop-types";

const Panel = ({
  type,
  title,
  x,
  y,
  width: w = 12,
  height: h = 9,
  options,
  ...props
}) => {
  const gridPos = {
    x,
    y,
    w,
    h,
  };

  return (
    <panel
      gridPos={gridPos}
      options={options}
      title={title}
      type={type}
      {...props}
    />
  );
};

Panel.PropTypes = {
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  options: PropTypes.object,
};

export default Panel;
