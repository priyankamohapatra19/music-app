// import { useEffect, useState } from "react";
import ContentItem from "./ContentItem";
import "./Content.css";

const Content = ({ data }) => {
  return (
    <>
      <div className="content-discover">Discover</div>
      <div className="content-container">
        {data &&
          data.length > 0 &&
          data.map((val) => {
            return <ContentItem val={val} />;
          })}
      </div>
    </>
  );
};
export default Content;
