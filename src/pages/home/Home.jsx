// import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { useEffect } from "react";
import "./home.css";
import axios from "axios";
// import { userData } from "../../dummyData";
// import WidgetSm from "../../components/widgetSm/WidgetSm";
// import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useDispatch,useSelector } from "react-redux";
import { getAppointments } from "../../redux/Actions";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("https://dentalapp-nodebackend.herokuapp.com/api/getAppointments")
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

  return (
    <div className="home">
      {
        appointments.map((item,index)=>(
          <FeaturedInfo
          key={item._id}
          id = {item._id}
          name={item.name}
          email={item.email}
          message = {item.message}
          appointmentDate = {item.appointmentDate}
          />

        ))
      }
      
      {/* <Chart data={userData} title="User Analytics" grid dataKey="Active User"/> */}
      {/* <div className="homeWidgets">
        <h3>{appointments.length}</h3>
        <WidgetSm/>
        <WidgetLg/>
      </div> */}
    </div>
  );
}
