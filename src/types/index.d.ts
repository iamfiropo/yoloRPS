import constants from "../constants";
export type PositionType = "ROCK" | "PAPER" | "SCISSORS";

type ActionType =
  | constants.TYPES.BET
  | constants.TYPES.PLAY
  | constants.TYPES.CLEAR;

export type GameState = {
  balance: number;
  bets: Record<constants.POSITIONS, number>;
  computerChoice: constants.POSITIONS | null;
  playerChoice: constants.POSITIONS;
  totalBet: number;
  totalWin: number;
  gameStatus:
    | constants.GAME_STATUS.NOT_STARTED
    | constants.GAME_STATUS.IN_PROGRESS
    | constants.GAME_STATUS.COMPLETED;
};

export type Action = {
  type: ActionType;
  payload?: constants.POSITIONS;
};
