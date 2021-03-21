import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import danPhoto from './images/dan-circle.png';
import linhPhoto from './images/linh-circle.png';
import './styles.css';

export default function About() {
  return (
    <Menu right width={ 280 }>
        <h1>:poofy</h1>
        <h4>
            Lo-fi. Naps. Poofy Clouds. 
        </h4>
        <p>
            :poofy is a web experience with cozy, dreamy vibes to help you wind down and embrace JOMO (Joy of Missing Out).
            <br /><br />
            <i>“How are you?”</i><br />
            <i>"Tired."</i><br />
            As two full-time college students, we get it. We wanted to simplify the heavily commercialized notion of “self-care.” No social media or expensive splurges required. Treating yourself can be as effortless as listening to some chill lo-fi music and popping some poofy clouds. 
            <br /><br />
            <b><a href="https://www.urbandictionary.com/define.php?term=jomo" target="_blank">JOMO</a></b> <i>(noun)</i> Joy of Missing Out. Feeling content with staying in and disconnecting as a form of self-care.
            <i> Antonym: FOMO</i>
            <br /><br />
            <hr />
        </p>
        <p>
        :poofy was created by <b>Linda</b> (Linh + Dan).
        </p>
        <div className="bio">
            <a href="https://www.linkedin.com/in/dan-liu-b44b1610a/" target="_blank">
                <img 
                    src={danPhoto}
                    className="bio-photo-dan"
                />
            </a>
            <p style={{marginTop: 0}}>
                <a href="https://www.linkedin.com/in/dan-liu-b44b1610a/" target="_blank">Dan</a> is a first-year master’s student studying Creative Technology & Design (CTD) at CU Boulder. Life has always been a hustle for her. Prior to studying CTD, she spent a lot of late nights building architecture projects. The pandemic might make her socially awkward, but she enjoys having an introverted side of self for some self-care hours.
            </p>
        </div>
        <div className="bio">
            <a href="https://www.linhsiders.com/" target="_blank">
                <img 
                    src={linhPhoto}
                    className="bio-photo-linh"
                />
            </a>
            <p style={{marginTop: 0}}>
            <a href="https://www.linhsiders.com/" target="_blank">Linh</a> is a rising senior studying computer science and Spanish at MIT. She has been learning to embrace taking more breaks because it’s hard when you are a natural workaholic. She is currently taking a gap year to re-discover the fun in the small, everyday things during quarantine before returning to the chaotic outside world.
            </p>
        </div>
        <br />
        <p style={{marginBottom:"20px"}}>
        … Did we almost pull an all-nighter to finish this chill website for a <a href="https://t9hacks.org/home" target="_blank">36-hour hackathon</a>? Maybe.
        Good thing we can take our own advice and chill out with :poofy afterwards ☁
        </p>
        <br />
        <br />
    </Menu>
  );
};