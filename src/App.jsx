import "normalize.css";
import "./App.css";
import styles from "./App.module.scss";
import { SideBar } from "./components/SideBar";
import { GameBoard } from "./components/GameBoard";
import { GameContext } from "./context/GameContext";
import { useEffect, useState, useRef } from "react";
import { ProgressBar } from "./components/ProgressBar";
import { ColorBoard } from "./components/ColorBoard";
import { SelectColor } from "./components/SelectColor";
import { generateRandomColor } from "./utils/generateHexColors";

const getHighScore = () => {
  return localStorage.getItem("highScore") || 0;
};

const saveLocalHighScore = (score) => {
  localStorage.setItem("highScore", score);
};

const loadLastGame = () => {
  const lastGame = localStorage.getItem("lastGame");
  console.log({ lastGame });
  return lastGame != "undefined" ? JSON.parse(lastGame) : [];
};

function App() {
  const [highScore, setHighScore] = useState(getHighScore() || 0);
  const [score, setScore] = useState("-");
  const [remainingTotalTime, setRemainingTotaltime] = useState(30);
  const [remainingTime, setRemainingTime] = useState(10);
  const [isActiveGame, setIsActiveGame] = useState(false);
  // const [intervalId, setIntervalId] = useState();
  const [currentColor, setCurrentColor] = useState();
  const [colorOptions, setColorOptions] = useState([]);
  const [gameHistory, setGameHistory] = useState(loadLastGame() || []);

  const startGame = () => {
    setIsActiveGame(true);
    setScore(0);
    setRemainingTime(10);
    setRemainingTotaltime(30);
    setCurrentColor(generateRandomColor());
    setHighScore(getHighScore() || 0);
    setGameHistory([]);
  };

  const endGame = () => {
    setIsActiveGame(false);
    setRemainingTotaltime(30);
    setColorOptions([]);
    setCurrentColor("#ccc");
    setScore("-");
    if (score > highScore) {
      setHighScore(score);
      saveLocalHighScore(score);
    }
  };

  const resetData = () => {
    localStorage.removeItem("lastGame");
    localStorage.removeItem("highScore");
    setHighScore(0);
    setGameHistory([]);
    endGame();
  };

  const fontColorByLuminosity = (hex) => {
    hex = hex.replace(/^#/, "");

    // Converte o valor hexadecimal para valores de R, G e B
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Calcula a luminosidade
    const luminosity = 0.299 * r + 0.587 * g + 0.114 * b;

    return luminosity > 128 ? "#000" : "#fff";
  };

  const checkAnswer = (color) => {
    if (color === currentColor) {
      setScore((prevState) => Math.max(0, prevState + 5));
      addToHistory(
        color,
        fontColorByLuminosity(color),
        currentColor,
        fontColorByLuminosity(currentColor),
        true,
        10 - remainingTime
      );
    } else {
      setScore((prev) => Math.max(0, prev - 1));
      addToHistory(
        color,
        fontColorByLuminosity(color),
        currentColor,
        fontColorByLuminosity(currentColor),
        false,
        10 - remainingTime
      );
    }
    setCurrentColor(generateRandomColor());
    setRemainingTime(10);
  };

  const addToHistory = (
    color,
    fontColor,
    currentColor,
    currentFontColor,
    correct,
    time
  ) => {
    setGameHistory((prevState) => [
      {
        color,
        fontColor,
        currentColor,
        currentFontColor,
        correct,
        time,
      },
      ...prevState,
    ]);
  };

  useEffect(() => {
    localStorage.setItem("lastGame", JSON.stringify(gameHistory));
  }, [gameHistory]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      saveLocalHighScore(score);
    }
  }, [score, highScore]);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActiveGame && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prevState) => {
          if (prevState <= 1) {
            setScore((score) => Math.max(0, score - 2));
            const newColor = generateRandomColor();
            setCurrentColor((preState) => {
              addToHistory(
                "#FF000080",
                fontColorByLuminosity("#FF000080"),
                preState,
                fontColorByLuminosity(preState),
                false,
                10
              );
              return newColor;
            });
            setRemainingTime(10);
            return 10;
          }
          return prevState - 1;
        });
        setRemainingTotaltime((prevState) => {
          if (prevState <= 0) {
            console.log("end game");
            console.log({ gameHistory });
            endGame();
            return 0;
          }
          return prevState - 1;
        });
      }, 1000);
    } else if (!isActiveGame && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isActiveGame, currentColor]);

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
        <div className={styles.container}>
          <div>
            <h2>Guess the color</h2>
            <GameBoard />
            <ProgressBar />
            <ColorBoard bgColor={currentColor}>
              {!isActiveGame && <button onClick={startGame}>Start</button>}
            </ColorBoard>
            {isActiveGame && <SelectColor />}
            <div className={styles.resetData} onClick={resetData}>
              Reset all data
            </div>
          </div>
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default App;
