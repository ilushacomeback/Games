import { useImmer } from "use-immer";
import FieldLine from "./FieldLine";
import setWinner from "../utils/setWinner";

const Field = ({ setNewGame }) => {
  const stylesForParent = {
    display: "flex",
    flexDirection: "column",
  };

  const stylesForLine = {
    background: "white",
    display: "flex",
  };

  const styleForItem = {
    display: "flex",
    width: "50px",
    height: "50px",
    background: "#f0cb7d80",
    margin: "1px",
    justifyContent: "center",
    alignItems: "center",
  };

  const defaultState = {
    player: "X",
    field: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
    isWinner: null,
    isDraw: null,
  };

  const [state, setState] = useImmer({ ...defaultState });

  const setStep = ({ idLine, idItem }) => {
    setState((draft) => {
      const cell = draft.field[idLine][idItem];
      const currentPlayer = draft.player;
      const nextPlayer = currentPlayer === "X" ? "O" : "X";
      draft.field[idLine][idItem] = cell === "" ? currentPlayer : cell;
      const winner = setWinner(draft.field, currentPlayer);
      if (winner) {
        if (winner === "ничья") {
          draft.isDraw = true;
          draft.isWinner = true;
        } else {
          draft.isWinner = currentPlayer;
        }
      }
      draft.player = nextPlayer;
    });
  };

  const resetGame = () => {
    setState({ ...defaultState });
  };

  const { field, isWinner, isDraw } = state;

  const renderField = () => {
    return (
      <>
        {field.map((line, idLine) => (
          <FieldLine
            line={line}
            idLine={idLine}
            key={idLine}
            style={stylesForLine}
            styleForItem={styleForItem}
            set={setStep}
          />
        ))}
      </>
    );
  };

  const renderWinner = () => {
    return (
      <div
        style={{
          backgroundColor: "#90f28c",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <span>{isDraw ? "Draw" : `Win: ${isWinner}`}</span>
      </div>
    );
  };

  return (
    <div className="parent-field" style={stylesForParent}>
      {isWinner ? renderWinner() : renderField()}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <button onClick={resetGame}>Reset</button>
        <button onClick={setNewGame}>Back</button>
      </div>
    </div>
  );
};

export default Field;
