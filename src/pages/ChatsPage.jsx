import React from "react";
import { useSelector } from "react-redux";
import Groups from "../components/Groups";
import Chat from "../components/Chat";
import PageHeader from "../components/PageHeader";
import "../styles/ChatsPage.scss";

const ChatsPage = () => {
  const groups = useSelector((state) => state.groups);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="chats">
          <PageHeader text={"Groups"}></PageHeader>

          <div className="chats__main">
            <div className="chats__groups">
              <Groups groups={groups}></Groups>
            </div>
            <div className="chats__chat">
              <Chat selectedGroup={groups.selectedGroup}></Chat>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
