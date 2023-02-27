import React from "react";
import "../styles/Navbar.scss";
import logo_white from "../assets/logo.svg";
import logo_black from "../assets/logo_black.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  console.log("navbar>>>> ", auth);

  return (
    <div
      className={`nav__wrapper ${
        auth.isLoggedin ? "nav-transparent" : "nav-black"
      }`}
    >
      <div className="nav__container">
        <nav className="nav">
          <Link to={"/dashboard"}>
            <img
              src={auth.isLoggedin ? logo_black : logo_white}
              alt="Logo"
              className="nav__logo"
            />
          </Link>

          {auth.isLoggedin ? (
            <Link to="/profile" className="nav__profile">
              {auth.data.name.charAt(0)}
            </Link>
          ) : (
            <></>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
