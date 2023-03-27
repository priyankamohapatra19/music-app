import { useEffect, useState, useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { options } from "./../constants/apiOptions.js";
import "./Header.css";
import MusicContext from "../context/MusicContext";

const Header = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState();
  const ctx = useContext(MusicContext);

  useEffect(() => {
    fetch(
      `https://shazam.p.rapidapi.com/auto-complete?term=${search}%20the&locale=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setData(response.hints))
      .catch((err) => console.error(err));
  }, [search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    ctx.setSearchModal(true);
  };

  const handleModal = () => {
    ctx.setSearchModal(false);
  };

  const handleFocus = () => {
    ctx.setSearchModal(true);
  };

  return (
    <div className="header-container" onClick={handleModal}>
      <div className="app-text">SPOTIFY</div>
      <div className="app-header">
        <div>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            onFocus={handleFocus}
          />
        </div>
      </div>
      {data && data.length > 0 && ctx.searchModal && (
        <div className="search-container">
          {data.map((val) => (
            <div className="search-item">{val.term}</div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Header;
