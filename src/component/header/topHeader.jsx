<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../React Ecommerce Reda Tech/img/ChatGPT Image Dec 26, 2025, 10_49_46 AM.png";
import SearchBox from "./SearchBox";
=======
import { Link } from "react-router-dom";
import logo from "../../../public/images/img/ChatGPT Image Dec 26, 2025, 10_49_46 AM.png";
import SearchBox from "./searchBox";
>>>>>>> 6936e6050fb1b2fab8f38947fbada9d016b81957
import "./header-responsive.css";
function TopHeader() {
  return (
    <div className="top-header">
      <div className="container">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
        </Link>
<<<<<<< HEAD

=======
>>>>>>> 6936e6050fb1b2fab8f38947fbada9d016b81957
        <SearchBox />
      </div>
    </div>
  );
}

export default TopHeader;
