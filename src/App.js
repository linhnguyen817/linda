// import {ReactComponent as ReactLogo} from './images/cloud.svg';
import { useState, useEffect } from 'react';
import './styles.css';
import cloud from './images/cloud.svg';

const Emoji = ({symbol, label}) => (
  <span
      className="emoji"
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
  >
      {symbol}
  </span>
);

const numClouds = 10;
const minCloudHeight = 20;
const maxCloudHeight = 30;
function generateClouds() {
  var clouds = [];
  for (var i = 0; i < numClouds; i++) {
    clouds.push({
      id: i,
      height: Math.floor(Math.random() * (maxCloudHeight - minCloudHeight + 1)) + minCloudHeight,
      reflectedImage: Math.random() < 0.5,
      // TODO: emoji: ,
    });
  }
  return clouds
};

function App() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(1);
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    for (let i = 1; i <= 1; i++) {
      setTimeout(() => setClouds(arr => [...arr, {
        height: Math.floor(Math.random() * (maxCloudHeight - minCloudHeight + 1)) + minCloudHeight,
        reflectedImage: Math.random() < 0.5,
      }]));
    }
  }, []);

  console.log(clouds);
  return (
    
    <div className="App">
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
          You're doing great! <Emoji symbol="😅" label="nervous-laugh"/>
        </p>
        <div>
          {clouds.map((height, reflectedImage, key) => {
              return <img 
                src={cloud} 
                className="cloud"
                alt="cloud" 
                onAnimationEnd={() => setRunning(0)}
                running={running} 
                // onClick={() => {
                //   setCount(count + 1);
                //   setRunning(0)
                //   }
                // }
              />;
            })}
        </div>
        {/* <img 
          src={cloud} 
          className="cloud"
          alt="cloud" 
          onAnimationEnd={() => setRunning(0)}
          running={running} 
          // onClick={() => {
          //   setCount(count + 1);
          //   setRunning(0)
          //   }
          // }
        /> */}
    </div>
  );
}

export default App;
