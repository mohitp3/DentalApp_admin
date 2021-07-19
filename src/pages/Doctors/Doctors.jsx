import React from "react";
import { notify , confirmation } from "../../utils/notify";
import "./Doctors.css";
import { DeleteOutline } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { getDoctorList, addDoctor ,updateDoctor ,deleteDoctor } from "../../redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Doctors = () => {
  const dispatch = useDispatch();
  const { doctorList } = useSelector((state) => state.data);
  const [editIndex, setEdit] = useState("");

  const [name, setName] = useState("");
  const [expertism, setExpertise] = useState("");
  const [aboutTitle, setabTitle] = useState("");
  const [aboutDescription, setabDesc] = useState("");
  const [speciality, setSpeciality] = useState([]);
  const spec = {
    "teathWhitening" :{
      title: "Teeth Whitening",
      description: "Lorem ipsum dolor sit amet, consectetur ipsum dolor.",
      icon: "flaticon-medical-first32 text-white",
    },
    "teathCleaning":{
      title: "Teeth Cleaning",
      description: "Lorem ipsum dolor sit amet, consectetur ipsum dolor.",
      icon: "flaticon-medical-brush18 text-white",
    },
    "oralSurgery":{
      title: "Oral surgery",
      description: "Lorem ipsum dolor sit amet, consectetur ipsum dolor.",
      icon: "flaticon-medical-brush18 text-white",
    },
    "qualityBrackets":{
      title: "Quality Brackets",
      description: "Lorem ipsum dolor sit amet, consectetur ipsum dolor.",
      icon: "flaticon-medical-brush18 text-white",
    },
  };
  const submitDoc = (e) => {
    e.preventDefault();
    // console.log(speciality)
    const dataSpec  = [];
    speciality.forEach((item)=>{
      dataSpec.push(spec[item])
    })
    if (editIndex) {
      axios
        .post(
          process.env.REACT_APP_PROD_URL + "api/updateDoctor/" +
            editIndex,
          {
            name,
            expertism,
            aboutTitle,
            aboutDescription,
            speciality: dataSpec,
          }
        )
        .then((response) => {
          notify("success","Successfully Updated")
          dispatch(updateDoctor(response.data));
          setEdit("");
        })
        .catch((err) => {
          notify("error","Error in Updating")
        });
    } else {
      axios
        .post(process.env.REACT_APP_PROD_URL + "api/addDoctor", {
          name,
          expertism,
          aboutTitle,
          aboutDescription,
          speciality: dataSpec,
        })
        .then((response) => {
          notify("success","Successfully Added")
          dispatch(addDoctor(response.data));
          window.scrollTo(0, document.body.scrollHeight);
        })
        .catch((err) => {
          notify("error","Error in Adding")
        });
    }
    setabTitle("");
    setName("");
    setExpertise("");
    setabDesc("");
    setSpeciality({ value: [] });
  };
  const handleChange = (e) => {
    e.preventDefault();
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
          if(!speciality.includes(options[i].value)){
            value.push(options[i].value);
          }
        
      }
    }    
    setSpeciality([...speciality,...value]);
    
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_PROD_URL + "api/getDoctorList")
      .then((response) => {
        if (response.data) {
          dispatch(getDoctorList(response.data));
        } else {
          dispatch(getDoctorList([]));
        }
      })
      .catch((err) => {
        dispatch(getDoctorList([]));
      });
  }, [dispatch]);

  const handleEdit = (e, index) => {
    e.preventDefault();
    setEdit(index);
    const getData = doctorList.findIndex((item) => item._id === index);
    setabTitle(doctorList[getData].aboutTitle);
    setName(doctorList[getData].name);
    setExpertise(doctorList[getData].expertism);
    setabDesc(doctorList[getData].aboutDescription);
    setSpeciality({ value: [] });
    window.scrollTo(0, 0);
  };
  const handleDelete = (e, index) => {
    e.preventDefault();
    confirmation({
      title: "Are you sure ? ",
      message: "Please Confirm",
      buttons: [
        {
          label: "Yes",
          onClick: () => axios
          .delete(
            process.env.REACT_APP_PROD_URL + "api/deleteDoctor/" +
              index
          )
          .then((response) => {
            notify("success","Successfully Deleted")
            dispatch(deleteDoctor(index));
          })
          .catch((err) => {
            notify("error","Error in Deleting")
          })
        },
        {
          label: "No, Cancel",
        },
      ],
    });
    
  };

  return (
    <div className="user">
      <div className="newUser">
        <h1 className="newUserTitle">
          {editIndex ? "Update Doctor" : "Add New Doctor"}
        </h1>
        <form className="newUserForm">
          <div className="newUserItem">
            <label>Name</label>
            <input
              type="text"
              placeholder=""
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="newUserItem">
            <label>Expertise</label>
            <input
              type="text"
              placeholder=""
              value={expertism}
              onChange={(e) => {
                setExpertise(e.target.value);
              }}
            />
          </div>
          <div className="newUserItem">
            <label>About Title</label>
            <input
              type="text"
              placeholder=""
              value={aboutTitle}
              onChange={(e) => {
                setabTitle(e.target.value);
              }}
            />
          </div>
          <div className="newUserItem">
            <label>about Description</label>
            <input
              type="text"
              placeholder=""
              value={aboutDescription}
              onChange={(e) => {
                setabDesc(e.target.value);
              }}
            />
          </div>

          <div className="newUserItem">
            <label>Speciality</label>
            <select
              className="newUserSelect"
              name="active"
              id="active"
              multiple={true}
              onChange={handleChange}
              value={speciality}
            >
              <option value="teathWhitening">Teeth Whitening</option>
              <option value="teathCleaning">Teeth Cleaning</option>
              <option value="oralSurgery">Oral surgery</option>
              <option value="qualityBrackets">Quality Brackets</option>
              
            </select>
          </div>
          <div className="newUserItem">
          <button className="newUserButton" onClick={submitDoc} style={{marginTop:"40px"}}>
            {editIndex ? "Update" : "Create"}
          </button>
          </div>
        </form>
      </div>
      <div className="userTitleContainer">
        <h1 className="userTitle">Doctors List</h1>
      </div>
      <div className="productList">
        <table className="widgetLgTable">
          <tbody>
            <tr className="widgetLgTr">
              <th className="widgetLgTh">Index</th>
              <th className="widgetLgTh">Name</th>
              <th className="widgetLgTh">Expertise</th>
              <th className="widgetLgTh">About Title</th>
              <th className="widgetLgTh">About Description</th>
              <th className="widgetLgTh">Speciality</th>
              <th className="widgetLgTh">Edit</th>
              <th className="widgetLgTh">Delete</th>
            </tr>
            {doctorList &&
              doctorList.map((item, index) => (
                <tr key={item._id} className="widgetLgTr" key={item._id}>
                  <td className="widgetLgName">{index + 1}</td>
                  <td className="widgetLgName">{item.name}</td>
                  <td className="widgetLgName">{item.expertism}</td>
                  <td className="widgetLgName">{item.aboutTitle}</td>
                  <td className="widgetLgName">{item.aboutDescription}</td>
                  <th className="widgetLgName">
                    {item.speciality.map((spec) => (
                      <span>{spec.title + "-"}</span>
                    ))}
                  </th>
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

export default Doctors;
