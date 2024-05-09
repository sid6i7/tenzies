import logo from './logo.svg';
import './App.css';
import { Game } from './components/Game';
import { Scorecard } from './components/Scorecard';
import { useState } from 'react';

function App() {

  const getHighScore = () => {
    const time = JSON.parse(localStorage.getItem('highscore'));
    console.log(time);
    return time;
  }

  const [rolls, setRolls] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [highscore, setHighScore] = useState(() => getHighScore());
  return (
    <div className="app">
      <Scorecard
        rolls={rolls}
        seconds={seconds}
        highscore={highscore}
      />
      <Game
        incrementRolls={() => setRolls(rolls => rolls+1)}
        seconds={seconds}
        setSeconds = {setSeconds}
        resetRolls={() => setRolls(0)}
        setHighScore={setHighScore}
      />
    </div>
  );
}

export default App;
