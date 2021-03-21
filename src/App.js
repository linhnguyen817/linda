// import {ReactComponent as ReactLogo} from './images/cloud.svg';
import { useState, useEffect } from 'react';
import './styles.css';
import cloud from './images/cloud.svg';
import YoutubeVideoIframeAPI from './musicPlayer/musicPlayer.js';

const Emoji = ({ symbol, label }) => (
  <span
    className="emoji"
    role="img"
    aria-label={label ? label : ""}
    aria-hidden={label ? "false" : "true"}
  >
    {symbol}
  </span>
);

function App() {
  const [count, setCount] = useState(0);
  // const [arr, setArr] = useState(['hello', 'there']);
  // const [todos, setTodos] = useState([{ emoji: 'sushi', text: 'Learn Hooks' }]);
  const [running, setRunning] = useState(1)

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Number of clouds: {count}
        </p>
        <button onClick={() => {
          setCount(0);
          setRunning(1);
        }}>
          Start over
        </button>

        <p>
          You're doing great! <Emoji symbol="😅" label="nervous-laugh" />
        </p>
        <img
          src={cloud}
          className="cloud"
          alt="cloud"
          onAnimationEnd={() => setRunning(0)}
          running={running}
          onClick={() => {
            setCount(count + 1);
            setRunning(0)
          }
          }
        />
        <YoutubeVideoIframeAPI />
      </header>
    </div>
  );
}

export default App;
