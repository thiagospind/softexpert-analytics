import PropTypes from "prop-types";
import styles from "./Container.module.scss";

export const Container = ({ children }) => {
  Container.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return <div className={styles.container}>{children}</div>;
};

// const style = {
//   container: {
//     display: "flex",
//     width: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//   },
// };
