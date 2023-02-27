import "../styles/FixedNav.scss";
import React, { useEffect, useState } from "react";
import blogs from "../assets/blogs-nav.svg";
import dashboard from "../assets/dashboard-nav.svg";
import profile from "../assets/profile-nav.svg";
import search from "../assets/search-nav.svg";
import events from "../assets/events-nav.svg";
import { useSelector } from "react-redux";

const FixedNav = () => {
  const [isLogin, setIsLogin] = useState(false);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("first");
    setIsLogin(auth.isLoggedin);
  }, [auth]);

  return (
    <>
      {isLogin ? (
        <div className="fixed">
          <div className="fixed__icons">
            <img src={dashboard} alt="" />
            <img src={blogs} alt="" />
            <img src={events} alt="" />
            <img src={profile} alt="" />
          </div>

          <div className="fixed__separator"></div>

          <div className="fixed__input">
            <div className="fixed__searched"></div>
            <img src={search} alt="" />
            <input type="text" name="" id="" placeholder="Search “John Ive”" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FixedNav;
