import React, { useState, useEffect } from "react";
import axios from "axios";
import { notify } from "../../utils/notify";
import { useDispatch } from "react-redux";
import "./ClinicData.css";
import { getClinicData, updateClinicData } from "../../redux/Actions";

const ClinicData = () => {
  const dispatch = useDispatch();
  const [dentists, setDentists] = useState(0);
  const [patients, setPatients] = useState(0);
  const [rooms, setRooms] = useState(0);
  const [machines, setMachines] = useState(0);
  const [id, setId] = useState(0);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_PROD_URL + "api/getClinicData")
      .then((response) => {
        if (response.data) {
          dispatch(getClinicData(response.data));
          setDentists(response.data[0].dentists);
          setMachines(response.data[0].machines);
          setPatients(response.data[0].patients);
          setRooms(response.data[0].rooms);
          setId(response.data[0]._id);
        } else {
          dispatch(getClinicData([]));
        }
      })
      .catch((err) => {
        dispatch(getClinicData([]));
      });
  }, [dispatch]);

  const submitDoc = (e, index) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_PROD_URL + "api/updateClinicData/" + index, {
        dentists,
        machines,
        rooms,
        patients,
      })
      .then((response) => {
        notify("success", "Successfully Updated");
        dispatch(updateClinicData(response.data));
      })
      .catch((err) => {
        notify("error", "Error in Updating");
      });
  };

  return (
    <div className="user">
      <div className="newUser">
        <h1 className="newUserTitle">Clinic Data</h1>
        <form className="newUserForm">
          <div className="newUserItem">
            <label>Patients</label>
            <input
              type="number"
              placeholder=""
              value={patients}
              onChange={(e) => {
                setPatients(parseInt(e.target.value));
              }}
            />
          </div>
          <div className="newUserItem">
            <label>Dentists</label>
            <input
              type="number"
              placeholder=""
              value={dentists}
              onChange={(e) => {
                setDentists(parseInt(e.target.value));
              }}
            />
          </div>
          <div className="newUserItem">
            <label>Rooms</label>
            <input
              type="number"
              placeholder=""
              value={rooms}
              onChange={(e) => {
                setRooms(parseInt(e.target.value));
              }}
            />
          </div>
          <div className="newUserItem">
            <label>Machines</label>
            <input
              type="number"
              placeholder=""
              value={machines}
              onChange={(e) => {
                setMachines(parseInt(e.target.value));
              }}
            />
          </div>

          <div className="newUserItem">
            <button className="newUserButton" onClick={(e) => submitDoc(e, id)}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClinicData;
