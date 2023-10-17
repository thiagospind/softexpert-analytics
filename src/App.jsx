import "normalize.css";
import "./App.css";
import { SideBar } from "./components/SideBar";
import { Container } from "./components/Container";
import { GameBoard } from "./components/GameBoard";
import { GameContext } from "./context/GameContext";
import { useEffect, useState } from "react";
import { ProgressBar } from "./components/ProgressBar";
import { ColorBoard } from "./components/ColorBoard";
import { SelectColor } from "./components/SelectColor";

const generateRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16797215).toString(16);
  return `#${randomColor}`;
};

const getHighScore = () => {
  return localStorage.getItem("highScore") || 0;
};

function App() {
  const [highScore, setHighScore] = useState(getHighScore());
  const [score, setScore] = useState("-");
  const [remainingTotalTime, setRemainingTotaltime] = useState(30);
  const [remainingTime, setRemainingTime] = useState(10);
  const [isActiveGame, setIsActiveGame] = useState(false);
  const [intervalId, setIntervalId] = useState();
  const [currentColor, setCurrentColor] = useState();
  const [colorOptions, setColorOptions] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);

  const startGame = () => {
    setIsActiveGame(true);
    setScore(0);
    setRemainingTime(10);
    setRemainingTotaltime(30);
    setCurrentColor(generateRandomColor());
    setHighScore(localStorage.getItem("highScore") || 0);
  };

  const endGame = () => {
    setRemainingTotaltime(30);
    setIsActiveGame(false);
    setColorOptions([]);
    setCurrentColor("#ccc");
    setScore("-");
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
    }
  };

  const checkAnswer = (color) => {
    console.log(color, currentColor);
    if (color === currentColor) {
      setScore((prevState) => Math.max(0, prevState + 5));
      addToHistory(currentColor, true, 10 - remainingTime);
    } else {
      setScore((prev) => Math.max(0, prev - 1));
      addToHistory(currentColor, false, 10 - remainingTime);
    }
    setCurrentColor(generateRandomColor());
    setRemainingTime(10);
  };

  const addToHistory = (color, correct, time) => {
    setGameHistory((prevState) => [...prevState, { color, correct, time }]);
  };

  useEffect(() => {
    if (isActiveGame) {
      const interval = setInterval(() => {
        setRemainingTotaltime((prevState) => prevState - 1);
      }, 1000);
      setIntervalId(interval);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
  }, [isActiveGame]);

  useEffect(() => {
    if (remainingTotalTime <= 0) {
      endGame();
    }
  }, [remainingTotalTime]);

  useEffect(() => {
    const correctIndex = Math.floor(Math.random() * 3);
    const newOptions = [
      generateRandomColor(),
      generateRandomColor(),
      generateRandomColor(),
    ];
    newOptions[correctIndex] = currentColor;
    setColorOptions(newOptions);
  }, [currentColor]);

  return (
    <GameContext.Provider
      value={{
        highScore,
        setHighScore,
        remainingTotalTime,
        setRemainingTotaltime,
        score,
        setScore,
        colorOptions,
        checkAnswer,
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "row",
          width: "100%",
          justifyContent: "stretch",
        }}
      >
        <SideBar />
        <Container>
          <div>
            <h1>Guess the color</h1>
            <GameBoard />
            <ProgressBar />
            <ColorBoard bgColor={currentColor}>
              {!isActiveGame ? (
                <button onClick={() => startGame()}>Start</button>
              ) : null}
            </ColorBoard>
            {isActiveGame && <SelectColor />}
          </div>
        </Container>
      </div>
    </GameContext.Provider>
  );
}

export default App;
