import React from "react";
import "../styles/Notifications.scss";

const Notifications = () => {
  return (
    <div className="notifications">
      <div className="notifications__main">
        <h5 className="notifications__text-subHeading">Upcoming</h5>

        <div className="notifications__allevent">
          <div className="notifications__event">
            <div className="notifications__event-texts">
              <h3 className="notifications__text-heading">Design Hackathon</h3>
              <p className="notifications__text-details">
                26th February 2023 ( Gandhinagar )
              </p>
            </div>

            <button className="notifications__btn">View</button>
          </div>
          <div className="notifications__event">
            <div className="notifications__event-texts">
              <h3 className="notifications__text-heading">Design Hackathon</h3>
              <p className="notifications__text-details">
                26th February 2023 ( Gandhinagar )
              </p>
            </div>

            <button className="notifications__btn">View</button>
          </div>
          <div className="notifications__event">
            <div className="notifications__event-texts">
              <h3 className="notifications__text-heading">Design Hackathon</h3>
              <p className="notifications__text-details">
                26th February 2023 ( Gandhinagar )
              </p>
            </div>

            <button className="notifications__btn">View</button>
          </div>
          <div className="notifications__event">
            <div className="notifications__event-texts">
              <h3 className="notifications__text-heading">Design Hackathon</h3>
              <p className="notifications__text-details">
                26th February 2023 ( Gandhinagar )
              </p>
            </div>

            <button className="notifications__btn">View</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
