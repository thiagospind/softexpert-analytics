import styles from "./SideBar.module.scss";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

export const SideBar = () => {
  const { gameHistory } = useContext(GameContext);
  console.log({ gameHistory });
  return (
    <aside className={styles.sidebar}>
      <h3>Current/Latest game</h3>
      <div className={styles.header}>
        <div className={styles.itemHeader}>
          <h5>Guessed Color</h5>
        </div>
        <div className={styles.itemHeader}>
          <h5>Currect Color</h5>
        </div>
      </div>
      {gameHistory &&
        gameHistory.reverse().map((item, index) => {
          return item.correct ? (
            <>
              <div
                key={index}
                className={styles.containerAnswers}
                style={{
                  backgroundColor: item.color,
                  // opacity: item.correct ? 1 : 0.5,
                }}
              >
                {item.color}
              </div>
              <div>{item.time}</div>
            </>
          ) : (
            <div key={index} className={styles.wrongAnswer}>
              <div
                className={styles.containerAnswers}
                style={{
                  backgroundColor: item.color,
                  // opacity: item.correct ? 1 : 0.5,
                }}
              >
                {item.color}
              </div>
              <div
                className={styles.containerAnswers}
                style={{
                  backgroundColor: item.currentColor,
                  // opacity: item.correct ? 1 : 0.5,
                }}
              >
                {item.currentColor}
              </div>
            </div>
          );
        })}
    </aside>
  );
};
