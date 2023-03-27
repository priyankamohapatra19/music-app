import { useEffect, useRef } from "react";
import "./MusicPlayerContainer.css";
import { BiShuffle } from "react-icons/bi";
import { MdReplay } from "react-icons/md";
import { IoPlaySkipForwardSharp, IoPlaySkipBackSharp } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import { useContext, useState } from "react";
import MusicContext from "./../context/MusicContext";
import { GiPauseButton } from "react-icons/gi";
import { FaVolumeMute } from "react-icons/fa";
import { FaVolumeDown } from "react-icons/fa";
import { FaVolumeUp } from "react-icons/fa";

const MusicPlayerContainer = ({ progressBarRef, data }) => {
  const ctx = useContext(MusicContext);
  const volumeRef = useRef();
  const [volume, setVolume] = useState(0.5);
  const [isMute, setIsMute] = useState(false);
  const [end, setEnd] = useState(0);

  const handleProgress = (e) => {
    ctx.myRef.current.currentTime = ctx.progressBarRef.current.value;
  };
  useEffect(() => {
    setInterval(() => {
      if (
        Math.floor(ctx.myRef.current?.currentTime) ===
        Math.floor(ctx.myRef.current.duration)
      ) {
        let idx = data.findIndex((val) => {
          return val.key === ctx.currentSong.key;
        });
        if (idx === data.length - 1) {
          ctx.setCurrentSong(data[0]);
        } else ctx.setCurrentSong(data[idx + 1]);
      }
      const curr = ctx.myRef.current?.currentTime;
      ctx.setTimeProgress(curr);
      ctx.progressBarRef.current.value = ctx.myRef.current?.currentTime;
    }, 1000);
  });

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    ctx.myRef.current.volume = volumeRef.current.value;
  };

  const handleMute = () => {
    if (isMute) {
      setIsMute(false);
      ctx.myRef.current.volume = volume;
    } else {
      setIsMute(true);
      ctx.myRef.current.volume = 0;
    }
  };

  const handleBackward = () => {
    if (ctx.progressBarRef.current.value <= 5) {
      ctx.progressBarRef.current.value = 0;
      ctx.myRef.current.currentTime = ctx.progressBarRef.current.value;
    }
    ctx.myRef.current.currentTime = ctx.progressBarRef.current.value - 5;
    ctx.progressBarRef.current.value = ctx.progressBarRef.current.value - 5;
  };
  const handleForward = () => {
    const currTime = ctx.myRef.current.currentTime;
    console.log(ctx.progressBarRef.current.value);
    console.log("cirr: ", currTime);
    if (currTime + 5 > ctx.myRef.current.duration) {
      let idx = data.findIndex((val) => {
        return val.key === ctx.currentSong.key;
      });
      if (idx === data.length - 1) {
        ctx.setCurrentSong(data[0]);
      } else ctx.setCurrentSong(data[idx + 1]);
    } else {
      ctx.myRef.current.currentTime = currTime + 5;
      ctx.progressBarRef.current.value = currTime + 5;
    }
  };

  return (
    <div className="music-container">
      <div className="music-detail">
        <div className="music-img">
          <img
            src={ctx.currentSong.images.coverart}
            alt=""
            width="50px"
            height="50px"
          />
        </div>
        <div className="music-info">
          <div className="music-title">{ctx.currentSong.title}</div>
          <div className="music-subtitle">{ctx.currentSong.subtitle}</div>
        </div>
      </div>
      <div className="music-controls-section">
        <div className="music-controls-container">
          <div className="action-icon">
            <MdReplay />
          </div>
          <div className="action-icon" onClick={handleBackward}>
            <IoPlaySkipBackSharp />
          </div>

          <div
            className="action-icon"
            onClick={() => {
              ctx.handlePlayPause(ctx.currentSong);
            }}
          >
            {ctx.play ? <GiPauseButton /> : <FaPlay />}
          </div>

          <div className="action-icon" onClick={handleForward}>
            <IoPlaySkipForwardSharp />
          </div>
          <div className="action-icon">
            <BiShuffle />
          </div>
        </div>
        <div className="progress-bar-container">
          <span className="time-current">{formatTime(ctx.timeProgress)}</span>
          <input
            type="range"
            defaultValue="0"
            className="progress-bar"
            onChange={() => {
              handleProgress();
            }}
            min="0"
            max={ctx.myRef.current.duration}
            ref={ctx.progressBarRef}
          />
          <span className="time">{formatTime(ctx.duration)}</span>
        </div>
      </div>
      <div className="volume-range">
        <div className="volume-icon" onClick={handleMute}>
          {volume === "0" || isMute ? (
            <FaVolumeMute />
          ) : volume <= 0.5 ? (
            <FaVolumeDown />
          ) : (
            <FaVolumeUp />
          )}
        </div>
        <input
          type="range"
          className="volume-bar"
          defaultValue="0"
          min="0"
          max="1"
          value={isMute ? 0 : volume}
          ref={volumeRef}
          step="any"
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};
export default MusicPlayerContainer;
