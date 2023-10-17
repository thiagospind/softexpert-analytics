import React from "react";

export const GameContext = React.createContext({
  remainingTotalTime: 30,
  highScore: 0,
  score: 0,

  setRemainingTotaltime: () => {},
  setHighScore: () => {},
  setScore: () => {},
});
