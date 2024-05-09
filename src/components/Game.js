import css from "../css/Game.css";
import {useState, useEffect} from 'react';
import { Dice } from "./Dice";

export const Game = () => {

    const initDice = () => {
        const dices = [];
        for(let i = 0; i<10; i++) {
            const num = Math.floor((Math.random() * 6)+1);
            dices.push({
                num: num,
                locked: false
            });
        }
        console.log(dices);
        return dices;
    }

    const [dices, setDices] = useState(initDice());
    const [isFinished, setIsFinished] = useState(false);

  return (
    <div id='game'>
      <h1 id='game--title'>Tenzies</h1>
      <h3 id='game--rule'>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </h3>
      <div id='dice-container'>
      {dices.map((dice, idx) => {
        return <Dice key={idx} num={dice.num} locked={dice.locked}/>
      })}
      </div>
      <button id='game--btn'>{isFinished ? 'Reset' : 'Roll'}</button>
    </div>
  );
};
