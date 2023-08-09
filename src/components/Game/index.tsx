import { useReducer } from "react";
import Position from "../Position";
import { GameState, PositionType } from "../../types";
import constants from "../../constants/index";
import reducer from "../../reducers";
import "./index.css";
const positions: PositionType[] = ["ROCK", "PAPER", "SCISSORS"];

const initialGameState: GameState = {
  balance: constants.VALUE.BALANCE,
  bets: positions.reduce((acc, item) => {
    acc[item] = 0;
    return acc;
  }, {} as GameState["bets"]),
  computerChoice: null,
  playerChoice: [],
  totalBet: 0,
  totalWin: 0,
  gameStatus: constants.GAME_STATUS.NOT_STARTED,
};

const Game: React.FC = () => {
  const [gameState, dispatch] = useReducer(reducer, initialGameState);

  const handleBet = (position: PositionType) => {
    dispatch({
      type: constants.TYPES.BET,
      payload: position,
    });
  };

  const handlePlay = () => {
    dispatch({
      type: constants.TYPES.PLAY,
    });
  };

  const handleClear = () => {
    dispatch({
      type: constants.TYPES.CLEAR,
    });
  };

  const isDisabled =
    gameState.playerChoice.length === 0 ||
    gameState.gameStatus === constants.GAME_STATUS.COMPLETED;

   return (
    <div className="game">
      <div className="game-state">
        <span>Balance: {gameState.balance} </span>
        <span>BET: {gameState.totalBet} </span>
        <span>WIN: {gameState.totalWin}</span>
      </div>

      {!gameState.computerChoice && (
        <div className="pick-your-positions">
          <h4>PICK YOUR POSITIONS</h4>
        </div>
      )}
      {gameState.totalWin > 0 ? (
        <div className="win">
          <h2>{gameState.computerChoice} WON</h2>
          <h3>YOU WIN {gameState.totalWin}.00</h3>
        </div>
      ) : gameState.computerChoice ? (
        <div className="game-result">
          <h4 className="computer">{gameState.computerChoice} </h4>
          <h4> vs </h4>
          <h4 className="player">{gameState.playerChoice.join(", ")} </h4>
        </div>
      ) : null}

      <div className="position-row">
        {positions.map((position) => (
          <span className="position" key={position}>
            <Position
              position={position}
              canBet={
                gameState.balance >= constants.VALUE.BET &&
                gameState.playerChoice.length < 2 &&
                gameState.gameStatus !== constants.GAME_STATUS.COMPLETED
              }
              onBet={() => handleBet(position)}
            />
          </span>
        ))}
      </div>

      <div className="button-row">
        {gameState.gameStatus !== constants.GAME_STATUS.COMPLETED && (
          <button className="play" disabled={isDisabled} onClick={handlePlay}>
            Play
          </button>
        )}
        {gameState.gameStatus === constants.GAME_STATUS.COMPLETED && (
          <button className="clear" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Game;
