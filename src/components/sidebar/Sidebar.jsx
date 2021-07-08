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
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
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
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Slider Images
              </li>
            </Link>
            <Link to="/aboutinfo" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                About Info
              </li>
            </Link>
            <Link to="/doctors" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Doctors
              </li>
            </Link>
            <Link to="/services" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Services
              </li>
            </Link>
            <Link to="/clinicdata" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                ClinicData
              </li>
            </Link>
            <Link to="/gallery" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Gallery
              </li>
            </Link>
            <Link to="/blogs" className="link">
              <li className="sidebarListItem">
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
