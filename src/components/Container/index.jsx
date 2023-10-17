import PropTypes from "prop-types";

export const Container = ({ children }) => {
  Container.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return <div style={style.container}>{children}</div>;
};

const style = {
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};
