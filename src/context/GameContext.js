import React from "react";

export const GameContext = React.createContext({
  remainingTotalTime: 30,
  remainingTime: 10,
  highScore: 0,
  score: 0,
  currentColor: "",
  colorOptions: [],
  gameHistory: [],

  setRemainingTotaltime: () => {},
  setRemainingTime: () => {},
  setHighScore: () => {},
  setScore: () => {},
  setCurrentColor: () => {},
  setColorOptions: () => {},
  checkAnswer: () => {},
  startGame: () => {},
  endGame: () => {},
  setGameHistory: () => {},
});
