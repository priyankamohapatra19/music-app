import RelatedMusicItem from "./RelatedMusicItem";
import "./RelatedMusic.css";

const RelatedMusic = ({ data }) => {
  return (
    <>
      <div className="top-charts-text">Top Charts</div>
      <div className="top-charts">
        {data &&
          data.length > 0 &&
          data.map((val) => {
            return <RelatedMusicItem val={val} />;
          })}
      </div>
      <div>
        <div className="top-artists-text">Top Artists</div>
        <div className="top-artists">
          {data &&
            data.length > 0 &&
            data.map((val) => {
              return (
                <div>
                  <img src={val.images.background} alt="" />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
export default RelatedMusic;
