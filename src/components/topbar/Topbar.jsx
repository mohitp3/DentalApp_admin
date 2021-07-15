import React from "react";
import "./topbar.css";
export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Dental APP Admin</span>
        </div>
        <div className="topRight">          
          <img src="https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/004/088/original/user.png" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
