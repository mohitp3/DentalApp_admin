import React from "react";
import {
  CalendarToday,
  PermIdentity
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getAboutInfo,
  addAboutInfo,
  updateAboutInfo,
  deleteAboutInfo,
} from "../../redux/Actions";
import { notify } from "../../utils/notify";
import "./AboutInfo.css";

const AboutInfo = () => {


  /**
   * state handle
   */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [edit, setUpdate] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_PROD_URL + "api/getAboutInfo")
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      axios
        .post(process.env.REACT_APP_PROD_URL + "api/updateAboutInfo/" + edit, {
          title,
          description,
          icon,
        })
        .then((response) => {
          notify("success","Successfully Updated")
          dispatch(updateAboutInfo(response.data));
          setUpdate("");
        })
        .catch((err) => {
          notify("error","Error in Updating")
        });
    } else {
      axios
        .post(process.env.REACT_APP_PROD_URL + "api/addAboutInfo", {
          title,
          description,
          icon,
        })
        .then((response) => {
          notify("success","Successfully Added")
          dispatch(addAboutInfo(response.data));
        })
        .catch((err) => {
          notify("error","Error in Adding")
        });
    }

    setTitle("");
    setDescription("");
    setIcon("");
  };

  const handleEdit = (e, index) => {
    e.preventDefault();
    setUpdate(index);
    const getData = aboutInfo.findIndex((item) => item._id === index);
    setTitle(aboutInfo[getData].title);
    setDescription(aboutInfo[getData].description);
    setIcon(aboutInfo[getData].icon);
    // dispatch(updateIndexAI(index));
  };

  const handleDelete = (e, index) => {
    e.preventDefault();
    axios
      .delete(process.env.REACT_APP_PROD_URL + "api/deleteAboutInfo/" + index)
      .then((response) => {
        notify("success","Successfully Deleted")
        dispatch(deleteAboutInfo(index));
      })
      .catch((err) => {
        notify("error","Error in Updating")
      });
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">About Info</h1>
      </div>
      <div className="userContainer" >
        <div className="userShow">
          {aboutInfo &&
            aboutInfo.map((item, index) => (
              <div key={item._id} className="userShowBottom">
                <span className="userShowTitle">{item.title}</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">{item.description}</span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">{item.icon}</span>
                </div>
                <button
                  className="userUpdateButton"
                  onClick={(e) => handleEdit(e, item._id)}
                >
                  Edit
                </button>
                <button
                  className="userUpdateButton"
                  onClick={(e) => handleDelete(e, item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">{edit ? "Update" : "Add"}</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Title"
                  className="userUpdateInput"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Description"
                  className="userUpdateInput"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Icon</label>
                <input
                  type="text"
                  placeholder=""
                  className="userUpdateInput"
                  value={icon}
                  onChange={(e) => {
                    setIcon(e.target.value);
                  }}
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
              <button className="userUpdateButton" onClick={handleSubmit}>
                {edit ? "Update" : "Add New"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutInfo;
