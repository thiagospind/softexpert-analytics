import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

export const GameBoard = () => {
  const { highScore, remainingTotalTime } = useContext(GameContext);
  return (
    <div style={style.container}>
      <div style={style.containerItem}>
        REMAINING TIME: {remainingTotalTime}
      </div>
      <div
        style={{
          ...style.containerItem,
          borderLeftWidth: 0,
          borderRightWidth: 0,
        }}
      >
        RESET
      </div>
      <div style={{ ...style.containerItem, flexDirection: "column" }}>
        <div
          style={{
            borderWidth: 0,
            borderBottomWidth: 2,
            borderColor: "red",
            borderStyle: "solid",
          }}
        >
          HIGH SCORE: {highScore}
        </div>
        <div>SCORE</div>
      </div>
    </div>
  );
};

const style = {
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#000",
    borderRadius: 4,
    overflow: "hidden",
  },
  containerItem: {
    display: "flex",
    flex: 1,
    alignSelf: "stretch",
    borderWidth: 2,
    borderColor: "red",
    borderStyle: "solid",
  },
};
