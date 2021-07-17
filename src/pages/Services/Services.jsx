import React from "react";
import { notify } from "../../utils/notify";
import "./Services.css";
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import {
  getServices,
  addService,
  updateService,
  deleteService,
} from "../../redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Services = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.data);
  const [editIndex, setEdit] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  const handleEdit = (e, index) => {
    e.preventDefault();
    setEdit(index);
    const getData = services.findIndex((item) => item._id === index);
    setTitle(services[getData].title);
    setDescription(services[getData].description);
    setIcon(services[getData].icon);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_PROD_URL + "api/getService")
      .then((response) => {
        if (response.data) {
          dispatch(getServices(response.data));
        } else {
          dispatch(getServices([]));
        }
      })
      .catch((err) => {
        dispatch(getServices([]));
      });
  }, [dispatch]);

  const submitDoc = (e) => {
    e.preventDefault();

    if (editIndex) {
      axios
        .post(process.env.REACT_APP_PROD_URL + "api/updateService/" + editIndex, {
          title,
          description,
          icon,
        })
        .then((response) => {
          notify("success", "Successfully Updated");
          dispatch(updateService(response.data));
          setEdit("");
        })
        .catch((err) => {
          notify("error", "Error in Updating");
        });
    } else {
      axios
        .post(process.env.REACT_APP_PROD_URL + "api/addService", {
          title,
          description,
          icon,
        })
        .then((response) => {
          notify("success", "Successfully Added");
          dispatch(addService(response.data));
          window.scrollTo(0, document.body.scrollHeight);
        })
        .catch((err) => {
          notify("error", "Error in Adding");
        });
    }
    setTitle("");
    setDescription("");
    setIcon("");
  };

  const handleDelete = (e, index) => {
    e.preventDefault();
    axios
      .delete(process.env.REACT_APP_PROD_URL + "api/deleteService/" + index)
      .then((response) => {
        notify("success", "Successfully Deleted");
        dispatch(deleteService(index));
      })
      .catch((err) => {
        notify("error", "Error in Deleting");
      });
  };

  return (
    <div className="user">
      {/* {console.log(services)} */}
      <div className="newUser">
        <h1 className="newUserTitle">
          {editIndex ? "Update Service" : "Add New Service"}
        </h1>
        <form className="newUserForm">
          <div className="newUserItem">
            <label>Title</label>
            <input
              type="text"
              placeholder=""
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="newUserItem">
            <label>Description</label>
            <input
              type="text"
              placeholder=""
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="newUserItem">
            <label>Icon</label>
            <input
              type="text"
              placeholder=""
              value={icon}
              onChange={(e) => {
                setIcon(e.target.value);
              }}
            />
          </div>

          <div className="newUserItem">
            <button
              className="newUserButton"
              onClick={submitDoc}
              style={{ marginTop: "40px" }}
            >
              {editIndex ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
      <div className="userTitleContainer">
        <h1 className="userTitle">Services</h1>
      </div>
      <div className="productList">
        <table className="widgetLgTable">
          <tbody>
            <tr className="widgetLgTr">
              <th className="widgetLgTh">Index</th>
              <th className="widgetLgTh">Title</th>
              <th className="widgetLgTh">Description</th>
              <th className="widgetLgTh">Icon</th>
              <th className="widgetLgTh">Edit</th>
              <th className="widgetLgTh">Delete</th>
            </tr>
            {services &&
              services.map((item, index) => (
                <tr className="widgetLgTr" key={item._id}>
                  <td className="widgetLgName">{index + 1}</td>
                  <td className="widgetLgName">{item.title}</td>
                  <td className="widgetLgName">{item.description}</td>
                  <td className="widgetLgName">{item.icon}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => {
                        handleEdit(e, item._id);
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={(e) => {
                        handleDelete(e, item._id);
                      }}
                    >
                      <DeleteOutline />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Services;
