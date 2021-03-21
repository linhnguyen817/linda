import React, { useEffect, useState } from 'react';
import './musicPlayer.css';
import key from './key';
import YoutubeAPI from 'simple-youtube-api';
import prevSong_button from '../images/prevSong_button.svg';
import play_button from '../images/play_button.svg';
import pause_button from '../images/pause_button.svg';

function YoutubeVideoIframeAPI() {
    const videoPlaylist = ['jJPMnTXl63E', 'qqeDku1kKj4', '_HBEMfiOTRU', 'FVqN3uKHT9g', 'sls44rlHpRg', 'gGlEuXCd76Q', 'BrnDlRmW5hs'];
    const [videoID, setVideoID] = useState('BrnDlRmW5hs');
    const [videoTitle, setVideoTitle] = useState('');
    const [videoPlaylistIndex, setVideoPlaylistIndex] = useState(0);
    const [videoPlaying, setVideoPlaying] = useState(true);
    const yt = new YoutubeAPI(key);

    // runs when youtube player is ready.
    const onPlayerReady = (event) => {
        // event.target.playVideo();
        console.log('iframe player is ready');
    };

    const onClickPlay = () => {
        setVideoPlaying(!videoPlaying);
        if (videoPlaying) {
            window.player.playVideo();
        } else {
            window.player.pauseVideo();
        }
    };

    const onClickNext = () => {
        setVideoPlaylistIndex(videoPlaylistIndex + 1);
        setVideoID(videoPlaylist[videoPlaylistIndex]);
    };

    const onClickPrev = () => {
        setVideoPlaylistIndex(videoPlaylistIndex - 1);
        setVideoID(videoPlaylist[videoPlaylistIndex]);
    };

    // only runs once
    useEffect(() => {
        window.player = new window.YT.Player(`youtube-player-${videoID}`, {
            videoId: videoID,
            events: {
                onReady: onPlayerReady
            }
        });
    }, []);

    // runs every time video ID changes
    useEffect(() => {
        // check to make sure that the player is ready first.
        if (window.player && window.player.loadVideoById) {
            // load the new videoID.
            window.player.loadVideoById(videoID);
            // setVideoTitle(video.title);
        }
    }, [videoID]);

    useEffect(() => {
        yt.getVideoByID(videoID)
            .then((video) => {
                if (video) {
                    console.log('video data: ', video);
                    setVideoTitle(video.title);
                }
            })
            .catch(console.error);
    }, [videoID]);

    return (
        <div>
            <div id={`youtube-player-${videoID}`} />
            < button onClick={onClickPrev} className="prevSong"><img src={prevSong_button} className="prevSongIcon" alt="previousSongButton" /></button>
            <button onClick={onClickPlay} className="play" alt="playButton">
                {videoPlaying
                    ? <img src={play_button} className="playIcon" />
                    : <img src={pause_button} className="playIcon" />
                }
            </button>
            <button onClick={onClickNext} className="nextSong"><img src={prevSong_button} className="nextSongIcon" alt="nextSongButton" /></button>
            <div className="song-dataContainer"><div className="song-data">{videoTitle}</div></div>
        </div >
    );
}

export default YoutubeVideoIframeAPI;
