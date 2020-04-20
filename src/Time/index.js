import PropTypes from "prop-types";

const Time = ({ from = "now-6h", to = "now" }) => <time from={from} to={to} />;

Time.PropTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
};

export default Time;
