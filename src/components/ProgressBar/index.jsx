import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { GameContext } from "../../context/GameContext";

export const ProgressBar = ({ onTimeout, seconds }) => {
  ProgressBar.propTypes = {
    onTimeout: PropTypes.func.isRequired,
    seconds: PropTypes.number.isRequired,
  };

  const { remainingTotalTime } = useContext(GameContext);

  const progress = (remainingTotalTime / 30) * 100;

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: `${progress}%`,
          height: "10px",
          backgroundColor: "green",
        }}
      />
    </div>
  );
};
