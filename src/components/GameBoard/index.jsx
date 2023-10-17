import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import stylesCommon from "../../styles/common.module.scss";
import styles from "./GameBoard.module.scss";

export const GameBoard = () => {
  const { highScore, remainingTotalTime, score } = useContext(GameContext);
  return (
    <div className={stylesCommon.container}>
      <div className={stylesCommon.containerItem}>
        REMAINING TIME: {remainingTotalTime}
      </div>
      <div className={stylesCommon.containerItem}>
        <button>RESET</button>
      </div>
      <div className={stylesCommon.containerItem}>
        <div className={styles.score}>HIGH SCORE: {highScore}</div>
        <div>SCORE: {score}</div>
      </div>
    </div>
  );
};
