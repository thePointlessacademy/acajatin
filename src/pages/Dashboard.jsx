import React, { memo, useEffect, useState } from "react";
import Groups from "../components/Groups";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config";
import Chat from "../components/Chat";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../store/groupsSlice";
import "../styles/Dashboard.scss";
import Notifications from "../components/Notifications";
import LiveSessions from "../components/LiveSessions";
import PageHeader from "../components/PageHeader";

const Dashboard = () => {
  const groups = useSelector((state) => state.groups);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (groups.fetchGroups === false) {
      dispatch(getGroups());
    }

    console.log("All the grops >>>>>> ", groups);
  }, []);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="dashboard">
          <PageHeader
            text={`Hello, ${auth.data.name.split(" ")[0]}`}
          ></PageHeader>
          <div className="dashboard__main">
            <div className="dashboard__main-left">
              <h3 className="dashboard__text-subheading">Groups</h3>

              <div className="dashboard__groups">
                <Groups groups={groups}></Groups>
              </div>
            </div>
            <div className="dashboard__main-right">
              <div className="dashboard__notifications">
                <h3 className="dashboard__text-subheading">Notifications</h3>

                <Notifications></Notifications>
              </div>

              <div className="dashboard__liveSessions">
                <h3 className="dashboard__text-subheading">Live Sessions</h3>

                <LiveSessions></LiveSessions>
              </div>
              {/* {groups.selectedGroup !== null ? (
                <Chat selectedGroup={groups.selectedGroup}></Chat>
              ) : (
                <p>No group is selected</p>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Dashboard);
