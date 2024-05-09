import css from "../css/Scorecard.css";

export const Scorecard = (props) => {
  return (
    <div id="scorecard">
      <h1 id="scorecard--title">Score</h1>
      <div id="scorecard--info">
        <h2>
          Elapsed:{" "}
          <span style={{ fontWeight: "normal" }}>{props.seconds} seconds</span>{" "}
        </h2>
        <h2>
          Rolls:{" "}
          <span style={{ fontWeight: "normal" }}> {props.rolls} rolls </span>
        </h2>

        <h2>
          Highscore:{" "}
          <span style={{ fontWeight: "normal", fontSize: "24px" }}>
          {props.highscore === null ? (
        
             ' Never played before'
          
          ) : (
            `${props.highscore} seconds`
          )}{" "}
          </span>
        </h2>
      </div>
    </div>
  );
};
