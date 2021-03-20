// import {ReactComponent as ReactLogo} from './images/cloud.svg';
import { useState, useEffect } from 'react';
import './styles.css';
import cloudImg from './images/cloud.svg';

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

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
/*
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
*/

const numClouds = 10;
function generateClouds() {
  const xOffset = getWindowDimensions().width / 4;

  let clouds = [];
  for (let i = 0; i < numClouds; i++) {
    clouds.push({
      id: i,
      xOffset: i % 2 === 0 ? xOffset : -1 * xOffset,
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

  const cloudIntervalTime = 2300;
  useEffect(() => {
    const interval = setInterval(() => {
      let newClouds = [...clouds];
      newClouds[cloudIndex].isVisible = true;
      setClouds(newClouds);
      setCloudIndex(cloudIndex >= numClouds - 1 ? 0 : cloudIndex + 1);
    }, cloudIntervalTime);
    return () => clearInterval(interval);
  }, [cloudIndex, clouds]);

  return (
    <div className="App">
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
