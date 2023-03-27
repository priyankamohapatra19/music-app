import "./RelatedMusicItem.css";

const RelatedMusicItem = ({ val }) => {
  return (
    <div className="item-container">
      <div className="item-img">
        <img src={val.images.coverart} alt="" width="50px" height="50px" />
      </div>
      <div className="item-detail">
        <div className="item-title">{val.title}</div>
        <div className="item-subtitle">{val.subtitle}</div>
      </div>
    </div>
  );
};
export default RelatedMusicItem;
