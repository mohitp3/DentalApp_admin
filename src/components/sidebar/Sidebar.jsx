import "./sidebar.css";
import {
  LineStyle,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  let lastSelected = "";
  const actvicetab = (e) => {
    if(!lastSelected){
      lastSelected = document.querySelector(
        "#root > div.container > div.sidebar > div > div:nth-child(1) > ul > a > li"
      )
    }
    lastSelected.classList.remove("active");
    e.target.classList.add("active");
    lastSelected = e.target;
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active" onClick={actvicetab}>
                <LineStyle className="sidebarIcon" />
                Dashboard
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Website Data</h3>
          <ul className="sidebarList">
            <Link to="/slider" className="link">
              <li className="sidebarListItem" onClick={actvicetab}>
                <PermIdentity className="sidebarIcon" />
                Slider Images
              </li>
            </Link>
            <Link to="/aboutinfo" className="link">
              <li className="sidebarListItem" onClick={actvicetab}>
                <Storefront className="sidebarIcon" />
                About Info
              </li>
            </Link>
            <Link to="/doctors" className="link" onClick={actvicetab}>
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Doctors
              </li>
            </Link>
            <Link to="/services" className="link">
              <li className="sidebarListItem" onClick={actvicetab}>
                <BarChart className="sidebarIcon" />
                Services
              </li>
            </Link>
            <Link to="/clinicdata" className="link">
              <li className="sidebarListItem" onClick={actvicetab}>
                <BarChart className="sidebarIcon" />
                ClinicData
              </li>
            </Link>
            <Link to="/gallery" className="link">
              <li className="sidebarListItem" onClick={actvicetab}>
                <BarChart className="sidebarIcon" />
                Gallery
              </li>
            </Link>
            <Link to="/blogs" className="link">
              <li className="sidebarListItem" onClick={actvicetab}>
                <BarChart className="sidebarIcon" />
                Blogs
              </li>
            </Link>
          </ul>
        </div>
      </div>
      
    </div>
  );
}
