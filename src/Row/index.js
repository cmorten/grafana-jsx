import PropTypes from "prop-types";
import Panel from "../Panel";
import Panels from "../Panels";

const Row = ({
  children,
  collapsed = false,
  datasource,
  options,
  title,
  y,
  ...props
}) => {
  if (collapsed) {
    return (
      <Panel
        collapsed={collapsed}
        datasource={datasource}
        height={1}
        options={options}
        title={title}
        type={"row"}
        width={24}
        x={0}
        y={y}
        {...props}
      >
        <Panels>{children}</Panels>
      </Panel>
    );
  }

  return (
    <>
      <Panel
        collapsed={collapsed}
        datasource={datasource}
        height={1}
        options={options}
        title={title}
        type={"row"}
        width={24}
        x={0}
        y={y}
        {...props}
      >
        <Panels />
      </Panel>
      {children}
    </>
  );
};

Row.PropTypes = {
  children: PropTypes.arrayOf(PropTypes.object),
  collapsed: PropTypes.bool,
  datasource: PropTypes.string,
  title: PropTypes.string,
  y: PropTypes.number.isRequired,
  options: PropTypes.object,
};

export default Row;
