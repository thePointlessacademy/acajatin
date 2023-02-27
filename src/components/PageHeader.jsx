import React from "react";
import "../styles/PageHeader.scss";

const PageHeader = ({ ...props }) => {
  return (
    <div className="header">
      <p className="heading">{props.text}</p>

      <button className="btn">Refer a friend</button>
    </div>
  );
};

export default PageHeader;

// {auth.data.name.split(" ")[0]}
