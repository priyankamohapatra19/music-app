import { useEffect, useState, useContext } from "react";
import Content from "./Content";
import "./Home.css";
import LeftNav from "./LeftNav";
import RelatedMusic from "./RelatedMusic";
import Header from "./Header";
import { options } from "./../constants/apiOptions";
import MusicPlayerContainer from "./MusicPlayerContainer";
import MusicContext from "../context/MusicContext";

const Home = () => {
  // const [data, setData] = useState(ctx.saa);
  const ctx = useContext(MusicContext);

  // useEffect(() => {
  //   fetch(
  //     "https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0",
  //     options
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setData(response.tracks);
  //       ctx.setSaareGaana(response.tracks);
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <>
      <div className="home-container">
        <div className="home-header">
          <Header />
        </div>
        <div className="main-container">
          <div className="left-nav">
            <LeftNav />
          </div>
          <div className="content">
            <Content data={ctx.saareGaana} />
          </div>
          <div className="related-music">
            <RelatedMusic data={ctx.saareGaana} />
          </div>
        </div>
        {ctx.currentSong && <MusicPlayerContainer data={ctx.saareGaana} />}
      </div>
    </>
  );
};
export default Home;
