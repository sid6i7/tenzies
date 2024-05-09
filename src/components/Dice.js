import css from "../css/Dice.css";

export const Dice = (props) => {
    const num = props.num;
  return (
    <div
      className={`dice ${props.locked && "green-bg"}`}
      onClick={props.toggleDiceLock}
    >
      <div className="dice--num">
        {Array(num).fill().map((_, idx) => {
            return <div key={idx}>⏺</div>
        })}
      </div>
    </div>
  );
};
