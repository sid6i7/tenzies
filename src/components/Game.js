import css from "../css/Game.css";
import { useState, useEffect } from "react";
import { Dice } from "./Dice";
import Confetti from "react-confetti";

export const Game = () => {

  const getRandomNum = () => Math.floor(Math.random() * 6 + 1);

  const initDices = () => {
    const dices = [];
    for (let i = 0; i < 10; i++) {
      const num = getRandomNum();
      dices.push({
        id: i,
        num: num,
        locked: false,
      });
    }
    console.log(dices);
    return dices;
  };

  const toggleDiceLock = (id) => {
    setDices((oldDices) =>
      oldDices.map((dice) => {
        if (dice.id === id) {
          return {
            ...dice,
            locked: !dice.locked,
          };
        } else return dice;
      })
    );
  };

  const rollDice = () => {
    setDices((oldDices) => {
      return oldDices.map((dice) => {
        if (!dice.locked) {
          return {
            ...dice,
            num: getRandomNum(),
          };
        } else {
          return dice;
        }
      });
    });
  };

  const resetGame = () => {
    setDices(initDices());
    setIsFinished(false);
  };

  const [isFinished, setIsFinished] = useState(false);
  const [dices, setDices] = useState(() => initDices());

  useEffect(() => {
    const checkArr = dices.filter((dice) => dice.num === dices[0].num);
    setIsFinished(checkArr.length === dices.length);
  }, [dices]);

  return (
    <div id="game">
      {isFinished && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <h1 id="game--title">Tenzies</h1>
      <h3 id="game--rule">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </h3>
      <div id="dice-container">
        {dices.map((dice, idx) => {
          return (
            <Dice
              key={idx}
              num={dice.num}
              locked={dice.locked}
              toggleDiceLock={() => toggleDiceLock(dice.id)}
            />
          );
        })}
      </div>
      <button id="game--btn" onClick={isFinished ? resetGame : rollDice}>
        {isFinished ? "Reset" : "Roll"}
      </button>
    </div>
  );
};
