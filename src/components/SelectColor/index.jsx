import { useState } from "react";
import "./SelectColor.css";
import { ProgressBar } from "../ProgressBar";

export const SelectColor = () => {
  // const [totalTime, setTotalTime] = useState(30);
  // const [isGameActive, setIsGameActive] = useState(false);

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  };

  // const handleStart = () => {
  //   setIsGameActive(true);
  // };

  return (
    <div className="container">
      <div className="gameHeader">
        <div className="cellRemainingTime">
          REMAINING TIME (S)
          {/* <div>{totalTime}</div> */}
        </div>
        <div className="cellReset">
          <button className="resetButton">Reset</button>
        </div>
        <div className="cellScore">
          <div>HIGH SCORE</div>
          <div>SCORE</div>
        </div>
      </div>
      {/* <ProgressBar seconds={totalTime} /> */}
      <div className="colorGuess">
        <button className="startButton">Start</button>
      </div>
      <div className="colorsChoice">
        <button className="button button--left">{generateRandomColor()}</button>
        <button className="button button--middle">
          {generateRandomColor()}
        </button>
        <button className="button button--right">
          {generateRandomColor()}
        </button>
      </div>
    </div>
  );
};
