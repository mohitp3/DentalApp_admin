import { useEffect } from "react";
import "./home.css";
import axios from "axios";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { DeleteOutline } from "@material-ui/icons";

import { useDispatch,useSelector } from "react-redux";
import { getAppointments , deleteAppointment } from "../../redux/Actions";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://3.142.172.158:8000/api/getAppointments")
      .then((response) => {
        if (response.data) {
          dispatch(getAppointments(response.data));
        } else {
          dispatch(getAppointments([]));
        }
      })
      .catch((err) => {
        dispatch(getAppointments([]));
      });
  }, [dispatch]);

  const { appointments } = useSelector((state) => state.data);

  const handleDelete = (e, index) => {
    e.preventDefault();
    dispatch(deleteAppointment(index));
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Appointments</h1>
      </div>
      <div className="productList">
        <table className="widgetLgTable">
          <tbody>
            <tr className="widgetLgTr">
              <th className="widgetLgTh">Index</th>
              <th className="widgetLgTh">Name</th>
              <th className="widgetLgTh">Email</th>
              <th className="widgetLgTh">Message</th>
              <th className="widgetLgTh">Appointment Date</th>
              <th className="widgetLgTh">Delete</th>
            </tr>
            {appointments &&
              appointments.map((item, index) => (
                <tr className="widgetLgTr" key={item._id}>
                  <td className="widgetLgName">{index + 1}</td>
                  <td className="widgetLgName">{item.name}</td>
                  <td className="widgetLgName">{item.email}</td>
                  <td className="widgetLgName">{item.message}</td>
                  <td className="widgetLgName">{item.appointmentDate}</td>
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
}
