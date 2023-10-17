import "normalize.css";
import "./App.css";
import { SideBar } from "./components/SideBar";
import { Container } from "./components/Container";
import { GameBoard } from "./components/GameBoard";
import { GameContext } from "./context/GameContext";
import { useEffect, useState } from "react";
import { ProgressBar } from "./components/ProgressBar";
import { BoardColor } from "./components/BoardColor";

function App() {
  const [highScore, setHighScore] = useState(0);
  const [remainingTotalTime, setRemainingTotaltime] = useState(30);
  const [score, setScore] = useState(0);
  const [isActiveGame, setIsActiveGame] = useState(false);
  const [intervalId, setIntervalId] = useState();

  useEffect(() => {
    if (isActiveGame) {
      const aux = setInterval(() => {
        setRemainingTotaltime((prevState) => prevState - 1);
      }, 1000);
      setIntervalId(aux);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
  }, [isActiveGame]);

  useEffect(() => {
    if (remainingTotalTime <= 0) {
      setRemainingTotaltime(30);
      setIsActiveGame(false);
    }
  }, [remainingTotalTime]);

  return (
    <GameContext.Provider
      value={{
        highScore,
        setHighScore,
        remainingTotalTime,
        setRemainingTotaltime,
        score,
        setScore,
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
            <BoardColor isActiveGame={isActiveGame}>
              {!isActiveGame ? (
                <button onClick={() => setIsActiveGame(!isActiveGame)}>
                  Start
                </button>
              ) : null}
            </BoardColor>
          </div>
        </Container>
      </div>
    </GameContext.Provider>
  );
}

export default App;
