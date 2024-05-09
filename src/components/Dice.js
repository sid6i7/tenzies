import css from "../css/Dice.css";

export const Dice = (props) => {
  return (
    <div
      className={`dice ${props.locked && "green-bg"}`}
      onClick={props.toggleDiceLock}
    >
      <h1 className="dice--num">{props.num}</h1>
    </div>
  );
};
