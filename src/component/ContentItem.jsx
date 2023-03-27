import { useContext, useState, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";
import "./ContentItem.css";
import MusicContext from "../context/MusicContext";

const ContentItem = ({ val }) => {
  const ctx = useContext(MusicContext);

  return (
    <>
      <div
        className="content-item-container"
        onClick={() => {
          ctx.handlePlayPause(val);
        }}
      >
        <div
          className={`content-item-img ${
            ctx?.currentSong?.key === val.key ? "active" : ""
          }`}
        >
          <img src={val.images.coverart} alt="" width="200px" height="200px" />
        </div>
        <div className="content-item-detail">
          <div className="content-item-title">{val.title}</div>
          <div className="content-item-subtitle">{val.subtitle}</div>
        </div>
        {ctx?.currentSong?.key === val.key && (
          <>
            <div className="music-icon">
              {!ctx.play ? <FaPlay /> : <GiPauseButton />}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default ContentItem;
