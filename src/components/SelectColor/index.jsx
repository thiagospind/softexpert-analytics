import styles from "./SelectColor.module.scss";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

export const SelectColor = () => {
  const { colorOptions, checkAnswer } = useContext(GameContext);

  return (
    <div className={styles.container}>
      {colorOptions &&
        colorOptions.map((color, index) => (
          <div key={index} className={styles.containerItem}>
            <button
              className={styles.containerItem}
              onClick={() => checkAnswer(color)}
            >
              {color}
            </button>
          </div>
        ))}
    </div>
  );
};
