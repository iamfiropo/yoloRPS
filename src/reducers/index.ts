import { GameState, PositionType, Action } from "../types/index";
import constants from "../constants/index";

const positions: PositionType[] = ["ROCK", "PAPER", "SCISSORS"];

const reducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case constants.TYPES.BET:
      const payload = action.payload as PositionType;

      return {
        ...state,
        balance: state.balance - constants.VALUE.BET,
        bets: {
          ...state.bets,
          [payload]: state.bets[payload] + constants.VALUE.BET,
        },
        playerChoice: [...state.playerChoice, payload],
        totalBet: state.totalBet + constants.VALUE.BET,
        gameStatus: constants.GAME_STATUS.IN_PROGRESS,
      };
    case constants.TYPES.PLAY:
      const computerChoice =
        positions[Math.floor(Math.random() * positions.length)];

      let winnings = 0;

      if (state.playerChoice.length === 1) {
        if (state.playerChoice.includes(computerChoice)) {
          winnings = state.bets[computerChoice] * constants.WINNING_RATE.WINNING_RATE_ONE_POSITION;
        }
      } else {
        if (state.playerChoice.includes(computerChoice)) {
          winnings =
            positions.reduce((acc, item) => {
              acc = acc + state.bets[item];
              return acc;
            }, 0) * constants.WINNING_RATE.WINNING_RATE_TWO_POSITIONS;
        }
      }

      return {
        ...state,
        balance: state.balance + winnings,
        computerChoice,
        totalWin: winnings,
        gameStatus: constants.GAME_STATUS.COMPLETED,
      };
    case constants.TYPES.CLEAR:
      return {
        ...state,
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
    default:
      return state;
  }
};

export default reducer;
