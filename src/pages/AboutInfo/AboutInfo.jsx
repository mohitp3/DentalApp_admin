import React from "react";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
//   import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAboutInfo,addAboutInfo} from "../../redux/Actions";

import "./AboutInfo.css";

const AboutInfo = () => {
    /**
     * state handle
     */
     const [title,setTitle] = useState("");
     const [description,setDescription] = useState("");
     const [icon,setIcon] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("https://dentalapp-nodebackend.herokuapp.com/api/getAboutInfo")
      .then((response) => {
        if (response.data) {
          dispatch(getAboutInfo(response.data));
        } else {
          dispatch(getAboutInfo([]));
        }
      })
      .catch((err) => {
        dispatch(getAboutInfo([]));
      });
  }, [dispatch]);

  const { aboutInfo } = useSelector((state) => state.data);


  const handleSubmit =(e)=>{
    e.preventDefault();
    axios.post('https://dentalapp-nodebackend.herokuapp.com/api/addAboutInfo',{title,description,icon}).then((response)=>{
        dispatch(addAboutInfo(response.data));            
        }).catch(err=>{
          console.log(err);
        });       
        setTitle("")
        setDescription("")
        setIcon("")
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">About Info</h1>
       </div>
      <div className="userContainer">
        {aboutInfo &&
          aboutInfo.map((item,index) => (
            <div className="userShow">
              <div className="userShowBottom">
                <span className="userShowTitle">{item.title}</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">{item.description}</span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">{item.icon}</span>
                </div>
              </div>
            </div>
          ))}

        <div className="userUpdate">
          <span className="userUpdateTitle">Add</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  className="userUpdateInput"
                  value = {title}
                  onChange = {e=>{setTitle(e.target.value)}}
                />
              </div>
              <div className="userUpdateItem">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  className="userUpdateInput"
                  value = {description}
                  onChange = {e=>{setDescription(e.target.value)}}
                />
              </div>
              <div className="userUpdateItem">
                <label>Icon</label>
                <input
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                  value = {icon}
                  onChange = {e=>{setIcon(e.target.value)}}
                />
              </div>
              
            </div>
            <div className="userUpdateRight">
              {/* <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div> */}
              <button className="userUpdateButton" onClick={handleSubmit}>Add New</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutInfo;
