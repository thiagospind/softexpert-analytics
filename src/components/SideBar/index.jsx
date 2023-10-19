import styles from "./SideBar.module.scss";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

export const SideBar = () => {
  const { gameHistory } = useContext(GameContext);
  // console.log({ gameHistory });
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
        gameHistory.map((item, index) => {
          return (
            <div key={index} className={styles.containerAnswers}>
              {!item.correct && (
                <div
                  className={styles.answers}
                  style={{
                    backgroundColor: item.color,
                    color: item.fontColor,
                  }}
                >
                  {item.color}
                </div>
              )}
              <div
                className={styles.answers}
                style={{
                  backgroundColor: item.currentColor,
                  color: item.currentFontColor,
                }}
              >
                {item.currentColor}
              </div>
              <img
                className={styles.icon}
                src={item.correct ? "/icons/done.svg" : "/icons/wrong.svg"}
                alt=""
              />
              <div className={styles.time}>{item.time}</div>
            </div>
          );
        })}
    </aside>
  );
};
