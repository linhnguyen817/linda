// import {ReactComponent as ReactLogo} from './images/cloud.svg';
import { useState, useEffect } from 'react';
import './styles.css';
import cloudImg from './images/cloud.svg';
import website_background from './images/website_background.svg';
import music_player from './images/music_player.svg';

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

const getWindowWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

const numClouds = 10;
function generateClouds() {
  const maxXOffset = window.innerWidth / 4;

  let clouds = [];
  for (let i = 0; i < numClouds; i++) {
    clouds.push({
      id: i,
      xOffset: Math.floor(Math.random() * maxXOffset),
      isReflected: Math.random() < 0.5,
      isVisible: false,
      // TODO: emoji: ,
    });
  }
  return clouds;
};

function App() {
  const [score, setScore] = useState(0);
  const [cloudIndex, setCloudIndex] = useState(0);
  const [clouds, setClouds] = useState(generateClouds());

  // make generated clouds visible at set interval
  const cloudIntervalTime = 3000;
  useEffect(() => {
    const interval = setInterval(() => {
      let newClouds = [...clouds];
      newClouds[cloudIndex].isVisible = true;
      setClouds(newClouds);
      setCloudIndex(cloudIndex >= numClouds - 1 ? 0 : cloudIndex + 1);
    }, cloudIntervalTime);
    
    return () => clearInterval(interval);
  }, [cloudIndex, clouds]);

  // resize clouds as window width changes
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());
  
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null;
    function handleResize() {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setWindowWidth(getWindowWidth()), 150);

      // re-calculate cloud offsets with new window width
      let maxXOffset = windowWidth / 4;
      clouds.map(cloud => {
        cloud.xOffset = Math.floor(Math.random() * maxXOffset);
      })
    };

    // set resize listener
    window.addEventListener('resize', handleResize);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="App" style={{
      backgroundImage: `url(${website_background})`,
      }}>
      <img
        src={music_player}
        className="musicPlayer"
      />
      <p>
        Score: {score}
      </p>
      <p>
        You're doing great! <Emoji symbol="😅" label="nervous-laugh"/>
      </p>
      
      <div className="cloud-wrapper">
        {clouds.map(cloud => {
            return <img 
              key={cloud.id}
              src={cloudImg} 
              className="cloud"
              alt="cloud"
              data-running={cloud.isVisible} 
              onAnimationEnd={() => {
                cloud.isVisible = false;
              }}
              onClick={() => {
                setScore(score + 1);
                cloud.isVisible = false;
                }
              }
              style={{
                transform: (cloud.isReflected ? "scaleX(-1)" : "scaleX(1)") + 
                            ` translateX(${cloud.xOffset}px)`
              }}
            />;
          })}
      </div>
    </div>
  );
}

export default App;
