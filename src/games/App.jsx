import Field from "./ticTacToe/components/Field";
import Cities from "./cities/components/Cities";
import StartWindow from "./StartWindow";
import { useState } from "react";
const App = () => {
  const [currentGame, setState] = useState("start");

  const setNewGame = (game) => () => {
    setState(game);
  };

  const mappingGames = {
    start: <StartWindow setTicTacToe={setNewGame("field")} setHangman={setNewGame('cities')} />,
    field: <Field setNewGame={setNewGame("start")} />,
    cities: <Cities setNewGame={setNewGame("start")} />,
  };

  return <div className="container">{mappingGames[currentGame]}</div>;
};
export default App;
