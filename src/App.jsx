import "normalize.css";
import "./App.css";
import styles from "./App.module.scss";
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
    setGameHistory([]);
  };

  const checkAnswer = (color) => {
    console.log(color, currentColor);
    if (color === currentColor) {
      setScore((prevState) => Math.max(0, prevState + 5));
      addToHistory(color, currentColor, true, 10 - remainingTime);
    } else {
      setScore((prev) => Math.max(0, prev - 1));
      addToHistory(color, currentColor, false, 10 - remainingTime);
    }
    setCurrentColor(generateRandomColor());
    setRemainingTime(10);
  };

  const addToHistory = (color, currentColor, correct, time) => {
    setGameHistory((prevState) => [
      { color, currentColor, correct, time },
      ...prevState,
    ]);
  };

  useEffect(() => {
    if (isActiveGame) {
      const interval = setInterval(() => {
        setRemainingTime((prevState) => {
          if (prevState <= 0) {
            setScore((score) => Math.max(0, score - 2));
            addToHistory(currentColor, false, 10);
            setCurrentColor(generateRandomColor());
            return 10;
          }
          return prevState - 1;
        });
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
        endGame,
        gameHistory,
        currentColor,
      }}
    >
      <div className={styles.main}>
        <SideBar />
        <Container>
          <div>
            <h2>Guess the color</h2>
            <GameBoard />
            <ProgressBar />
            <ColorBoard bgColor={currentColor}>
              {!isActiveGame ? (
                <button onClick={startGame}>Start</button>
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
