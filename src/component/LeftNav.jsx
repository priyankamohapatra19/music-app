import { emoji } from "./../constants/utils";
import "./LeftNav.css";

const LeftNav = () => {
  return (
    <div>
      <div className="left-nav-content">
        {emoji.map((val) => {
          return (
            <div className="left-nav-icon">
              <div className="icon">{val.icon}</div>
              <div className="icon-title">{val.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LeftNav;
