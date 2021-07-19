import { useEffect,useState } from "react";
import "./home.css";
import { Button } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentinit, deleteAppointment } from "../../redux/Actions";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { notify , confirmation } from "../../utils/notify";



const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const [page,setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAppointmentinit());
  }, [dispatch]);

  const { appointments, totalAppointments } = useSelector((state) => state.data);

  const handleDelete = (e, index) => {
    e.preventDefault();
    confirmation({
      title: "Are you sure ? ",
      message: "Please Confirm",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteAppointment(index, notify)),
        },
        {
          label: "No, Cancel",
        },
      ],
    });
  };
  useEffect(() => {
    dispatch(getAppointmentinit(page));
    
  }, [page])
  const handlePageChange = (event, value) => {
    setPage(value)
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
                  <td className="widgetLgName">{index + 1 + (page-1)*5 }</td>
                  <td className="widgetLgName">{item.name}</td>
                  <td className="widgetLgName">{item.email}</td>
                  <td className="widgetLgName">{item.message}</td>
                  <td className="widgetLgName">{new Date(item.appointmentDate).toGMTString()}</td>
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
      <div className={classes.root}>
      <Pagination count={Math.ceil(totalAppointments/5)} onChange={handlePageChange} />
    </div>
    </div>
  );
}
