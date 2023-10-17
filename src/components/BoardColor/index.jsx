import PropTypes from "prop-types";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

export const BoardColor = ({ bgColor = "#ccc", children, isActiveGame }) => {
  BoardColor.propTypes = {
    bgColor: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
  };

  return (
    <div style={{ ...style.container, backgroundColor: bgColor }}>
      {children}
    </div>
  );
};

const style = {
  container: {
    width: "100%",
    height: 400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};
