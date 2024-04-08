const StartWindow = ({ setTicTacToe, setHangman }) => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', minWidth: '200px'}}>
      <button onClick={setTicTacToe}>Tic-Tac-Toe</button>
      <button onClick={setHangman}>Cities</button>
    </div>
  );
};
export default StartWindow;
