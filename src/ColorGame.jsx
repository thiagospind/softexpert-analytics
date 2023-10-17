import { useState, useEffect } from "react";

const generateRandomColor = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return `#${randomColor}`;
};

function ColorGame() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    localStorage.getItem("highScore") || 0
  );
  const [currentColor, setCurrentColor] = useState(generateRandomColor());
  const [options, setOptions] = useState([]);
  const [timer, setTimer] = useState(10);
  const [gameTimer, setGameTimer] = useState(30);
  const [gameHistory, setGameHistory] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);

  const startGame = () => {
    setIsGameActive(true);
    setScore(0);
    setTimer(10);
    setGameTimer(30);
    setGameHistory([]);
    setCurrentColor(generateRandomColor());
  };

  const endGame = () => {
    setIsGameActive(false);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score);
    }
    localStorage.setItem("lastGame", JSON.stringify(gameHistory));
  };

  const checkAnswer = (color) => {
    if (color === currentColor) {
      setScore((prev) => Math.max(0, prev + 5));
      addToHistory(currentColor, true, 10 - timer);
    } else {
      setScore((prev) => Math.max(0, prev - 1));
      addToHistory(currentColor, false, 10 - timer);
    }
    setCurrentColor(generateRandomColor());
    setTimer(10);
  };

  const addToHistory = (color, correct, time) => {
    setGameHistory((prev) => [...prev, { color, correct, time }]);
  };

  useEffect(() => {
    if (!isGameActive) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          setScore((score) => Math.max(0, score - 2));
          addToHistory(currentColor, false, 10);
          setCurrentColor(generateRandomColor());
          return 10;
        }
        return prev - 1;
      });

      setGameTimer((prev) => {
        if (prev <= 0) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameActive, currentColor]);

  useEffect(() => {
    const correctIndex = Math.floor(Math.random() * 3);
    const newOptions = [
      generateRandomColor(),
      generateRandomColor(),
      generateRandomColor(),
    ];
    newOptions[correctIndex] = currentColor;
    setOptions(newOptions);
  }, [currentColor]);

  return (
    <div>
      <button onClick={startGame}>Start Game</button>
      <button onClick={endGame}>End Game</button>
      <div>High Score: {highScore}</div>
      <div>Score: {score}</div>
      <div>Game Timer: {gameTimer}</div>
      <div>
        {isGameActive && (
          <>
            <div
              style={{
                backgroundColor: currentColor,
                width: "50px",
                height: "50px",
              }}
            ></div>
            {options.map((color, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(color)}
                style={{ backgroundColor: color }}
              ></button>
            ))}
            <div>Time left for this round: {timer}</div>
            <div>Game time left: {gameTimer}</div>
            <div>
              Game History:
              {gameHistory.map((item, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: item.color,
                    opacity: item.correct ? 1 : 0.5,
                  }}
                >
                  {item.time}s
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ColorGame;
