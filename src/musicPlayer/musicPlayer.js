import React, { useState, useEffect } from 'react';
import YoutubeAPI from 'simple-youtube-api';
import key from './key';

// add this line to index.html in the <head> tag:
/* <script src="https://www.youtube.com/iframe_api"></script> */

export default function YoutubePlayer() {
    const videoID = 'dQw4w9WgXcQ';
    const [videoTitle, setVideoTitle] = useState('');
    const yt = new YoutubeAPI(key);

    window.onYouTubeIframeAPIReady = () => {
        window.player = new window.YT.Player('player', {
            videoId: videoID,
            height: 0,
            width: 0,
            events: {
                onReady: (e) => {
                    console.log('player ready');
                    e.target.playVideo();
                }
            }
        });
    };

    useEffect(() => {
        yt.getVideoByID(videoID)
            .then((video) => {
                if (video) {
                    console.log('video data: ', video);
                    setVideoTitle(video.title);
                } else console.log('video not found :(');
                window.onYouTubeIframeAPIReady();
            })
            .catch(console.error);
    }, [videoID]);

    return (
        <div>
            <div id="player"></div>
            <div className="controls">
                <button
                    className="stop"
                    onClick={() => {
                        window.player?.pauseVideo();
                    }}
                >
                    Pause
				</button>

                <button
                    className="play"
                    onClick={() => {
                        window.player?.playVideo();
                    }}
                >
                    Play
				</button>
            </div>
            <div className="song-data">{videoTitle}</div>
        </div>
    );
}

// more documentation here:
//  https://tjrgg.github.io/simple-youtube-api/master/index.html
