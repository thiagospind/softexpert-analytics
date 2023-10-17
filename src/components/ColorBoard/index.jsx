import PropTypes from "prop-types";
import styles from "./ColorBoard.module.scss";

export const ColorBoard = ({ bgColor = "#ccc", children }) => {
  ColorBoard.propTypes = {
    bgColor: PropTypes.node,
    children: PropTypes.node,
  };

  return (
    <div className={styles.container} style={{ backgroundColor: bgColor }}>
      {children}
    </div>
  );
};
