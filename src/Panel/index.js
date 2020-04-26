import PropTypes from "prop-types";

const Panel = ({
  children,
  datasource,
  height: h = 9,
  options,
  type,
  title,
  width: w = 12,
  x,
  y,
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
      datasource={datasource}
      gridPos={gridPos}
      options={options}
      title={title}
      type={type}
      {...props}
    >
      {children}
    </panel>
  );
};

Panel.PropTypes = {
  children: PropTypes.any,
  datasource: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  options: PropTypes.object,
};

export default Panel;
