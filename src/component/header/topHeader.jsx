import { Link } from "react-router-dom";
import logo from "../../../public/images/img/ChatGPT Image Dec 26, 2025, 10_49_46 AM.png";
import SearchBox from "./searchBox";
import "./header-responsive.css";
function TopHeader() {
  return (
    <div className="top-header">
      <div className="container">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>
        <SearchBox />
      </div>
    </div>
  );
}

export default TopHeader;
