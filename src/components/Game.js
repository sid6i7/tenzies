import css from "../css/Game.css";
import { useState, useEffect } from "react";
import { Dice } from "./Dice";
import Confetti from "react-confetti";

export const Game = (props) => {
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
    props.incrementRolls();
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

  const startGame = () => {
    console.log(Date.now());
    setIsStarted(true);
  };

  const resetGame = () => {
    setDices(initDices());
    setIsFinished(false);
    props.resetRolls();
    setIsStarted(false);
    props.setSeconds(0);
  };

  const setHighScore = () => {
    console.log(props.highscore);
    if(props.highscore===undefined || props.seconds < props.highscore) {
        localStorage.setItem('highscore', JSON.stringify(props.seconds));
        props.setHighScore(props.seconds);
        console.log('ok')
    }
  }

  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [dices, setDices] = useState(() => initDices());

  useEffect(() => {
    const checkArr = dices.filter((dice) => dice.num === dices[0].num);
    if(checkArr.length === dices.length) {
        setHighScore();
        setIsFinished(true);
        console.log('okaokaokaoka');
    }
    
  }, [dices]);

  useEffect(() => {
    let intervalId;
    if(isStarted && !isFinished) {
        intervalId = setInterval(() => {
            props.setSeconds(time => Math.floor(time+1));
        }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isStarted, props.seconds])

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
      <div id="game--btn-container">
        <button
          className="game--btn"
          onClick={isStarted ? resetGame : startGame}
        >
          {isStarted ? "RESET" : "START"}
        </button>
        {isStarted && !isFinished && (
          <button className="game--btn" onClick={rollDice}>
            ROLL
          </button>
        )}
      </div>
    </div>
  );
};
