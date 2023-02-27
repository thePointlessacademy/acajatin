import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectgroup } from "../store/groupsSlice";
import groups from "../assets/groups.png";
import "../styles/Groups.scss";
import { useNavigate } from "react-router-dom";
// import { selectgroup } from "../store/groupsSlice";

const Groups = ({ ...props }) => {
  console.log("Groups>>>> ", props.groups);
  const auth = useSelector((state) => state.auth);
  console.log("itemuserme    ", auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectGroup = (groupid) => {
    dispatch(selectgroup(groupid));
    navigate("/chats");
  };

  const checkIfGroupApproved = (item) => {
    const userMemberShip = item.members.find(
      (member) => member.uid === auth.data.uid
    );

    if (userMemberShip.approve) {
      return "approved";
    } else if (userMemberShip.request) {
      return "requested";
    } else {
      return "not requested";
    }
  };

  return (
    <>
      {props.groups.data.map((item, index) => (
        // <>
        //   {checkIfGroupApproved(item) === "approved"
        //     ? "approved"
        //     : "notapproved"}
        // </>
        <div
          className={`groups mt-20`}
          key={item.groupid}
          onClick={() => handleSelectGroup(item.groupid)}
        >
          <img
            src={groups}
            alt="Groups Thumbnail"
            className="groups__thumbnail"
          />

          <div className="groups__main">
            <div className="groups__info">
              <h3 className="groups__text-heading"> {item.name}</h3>
            </div>

            <div className="groups__details">
              <div className="groups__details-people">
                <p>P</p>
                <div className="groups__details-items groups__details-items-first"></div>
                <div className="groups__details-items groups__details-items-second"></div>
              </div>

              <p className="groups__text-members">+100 members</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Groups;
