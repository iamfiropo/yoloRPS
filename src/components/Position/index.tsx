import { PositionType } from "../../types";
import constants from "../../constants";

type PositionProps = {
  position: PositionType;
  canBet: boolean;
  onBet: () => void;
};

const Position: React.FC<PositionProps> = ({
  position,
  canBet,
  onBet,
}: PositionProps) => (
  <span>
    <button disabled={!canBet} onClick={onBet}>
      {position !== "SCISSORS" && <p>{constants.VALUE.BET}</p>}
      <h2>{position}</h2>
    </button>
  </span>
);

export default Position;
