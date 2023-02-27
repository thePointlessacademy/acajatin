import React from "react";
import live from "../assets/live.svg";
import live_link from "../assets/live-link.svg";

import "../styles/LiveSessions.scss";
import { Link } from "react-router-dom";

const LiveSessions = () => {
  return (
    <div className="live">
      <div className="live__item">
        <div className="live__livenow">
          <img src={live} alt="" />
          <p>live now</p>
        </div>

        <h3 className="live__text-heading">
          Learn how to create portfolio on webflow
        </h3>
        <p className="live__text-subHeading">by Jatin p</p>

        <div className="live__links">
          <Link to="/profile">
            <div className="live__links-item">
              <p>Youtube</p>
              <img src={live_link} alt="" />
            </div>
          </Link>
          <Link to="/profile">
            <div className="live__links-item">
              <p>Instagram</p>
              <img src={live_link} alt="" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LiveSessions;
