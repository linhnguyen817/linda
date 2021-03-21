import { useState, useEffect } from 'react';
import './styles.css';

import YoutubeVideoIframeAPI from './musicPlayer/musicPlayer.js';
import cloudImg from './images/cloud.svg';
import website_background from './images/website_background.svg';
import music_player from './images/music_player.svg';
import About from './about.js';

const textArr = [
  "Work smarter, \nnot harder. Sleep \nwhen you need to 💤",
  "Work hard, \nplay hard, \nrest hard 😌",
  "It's Monday, \nlet's get \nsome sushi 🍣",
  "The time to relax \nis when you don't \nhave time for it ⏳",
  "Self-care is \nhow you take \nyour power back 🔌",
  "Time you enjoy \nwasting is not \nwasted time ⏰",
  "If your compassion \ndoes not include yourself, \nit is incomplete 👯‍♂️",
  "Take the time \ntoday to love yourself. \nYou deserve it 😍",
  "You can’t pour \nfrom an empty cup. Take \ncare of yourself first 🍸",
  "Be kinder to yourself. \nAnd then let your kindness \nflood the world 💗"
];

const getWindowWidth = () => window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

const numClouds = 10;
function generateClouds() {
  const maxXOffset = window.innerWidth <= 768 ? window.innerWidth / 4 : window.innerWidth / 8;

  let clouds = [];
  for (let i = 0; i < numClouds; i++) {
    clouds.push({
      id: i,
      xOffset: Math.floor(Math.random() * maxXOffset),
      isReflected: Math.random() < 0.5,
      isVisible: false,
    });
  }
  return clouds;
};

function App() {
  const [score, setScore] = useState(0);
  const [cloudIndex, setCloudIndex] = useState(0);
  const [clouds, setClouds] = useState(generateClouds());
  const [textArrIndex, setTextArrIndex] = useState(0);

  // make generated clouds visible at set interval
  const cloudIntervalTime = 3500;
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
      const maxXOffset = windowWidth <= 768 ? windowWidth / 3 : windowWidth / 8;
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

      <p className="score">
        Clouds Poofed: {score}
      </p>
      <About pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />

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
              setTextArrIndex(textArrIndex >= textArr.length - 1 ? 0 : textArrIndex + 1);
            }
            }
            style={{
              transform: (cloud.isReflected ? "scaleX(-1)" : "scaleX(1)") +
                ` translateX(${cloud.xOffset}px)`
            }}
          />;
        })}
      </div>
      <p className="cloudText">{textArr[textArrIndex]}</p>

      <YoutubeVideoIframeAPI />
    </div>
  );
}

export default App;
