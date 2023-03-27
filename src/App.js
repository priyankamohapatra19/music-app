import Home from "./component/Home";
import "./styles.css";
import MusicContext from "./context/MusicContext";
import { useState, useRef, useEffect } from "react";
import { options } from "./constants/apiOptions";
import { Routes, Route } from "react-router-dom";
import Login from "./component/Login-Component/Login";

export default function App() {
  const [searchModal, setSearchModal] = useState(false);
  const [isMusicPlay, setIsMusicPlay] = useState(false);
  const [currentSong, setCurrentSong] = useState();
  const [play, setPlay] = useState(false);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [saareGaana, setSaareGaana] = useState([]);
  const myRef = useRef(null);
  const progressBarRef = useRef();

  useEffect(() => {
    fetch(
      "https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setSaareGaana(response.tracks);
      })
      .catch((err) => console.error(err));
  }, []);
  const handlePlayPause = (val) => {
    if (currentSong === undefined || currentSong.key !== val.key) {
      setCurrentSong(val);
      setPlay(true);
      return;
    }
    if (play) {
      myRef.current?.pause();
      setPlay(!play);
    } else {
      myRef.current?.play();
      setPlay(!play);
    }
  };

  const musicData = {
    searchModal,
    setSearchModal,
    isMusicPlay,
    setIsMusicPlay,
    currentSong,
    setCurrentSong,
    play,
    setPlay,
    handlePlayPause,
    myRef,
    progressBarRef,
    timeProgress,
    duration,
    setTimeProgress,
    saareGaana,
    setSaareGaana
  };

  const onLoadedMetadata = () => {
    const seconds = myRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  return (
    <MusicContext.Provider value={musicData}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <audio
        src={currentSong?.hub.actions[1].uri}
        controls
        ref={myRef}
        autoPlay
        onLoadedMetadata={onLoadedMetadata}
      ></audio>
    </MusicContext.Provider>
  );
}
