import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import styles from "./ProgressBar.module.scss";

export const ProgressBar = () => {
  const { remainingTotalTime } = useContext(GameContext);

  const progress = (remainingTotalTime / 30) * 100;

  return (
    <div>
      <div
        className={styles.progressBar}
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
};
