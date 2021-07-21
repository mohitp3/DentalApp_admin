import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "../src/App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SliderImages from "./pages/SliderImages/SliderImages";
import AboutInfo from "./pages/AboutInfo/AboutInfo";
import Doctors from "./pages/Doctors/Doctors";
import Services from "./pages/Services/Services";
import Gallery from "./pages/Gallery/Gallery";
import Blogs from "./pages/Blogs/Blogs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClinicData from "./pages/ClinicData/ClinicData";


function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/slider">
            <SliderImages />
          </Route>
          <Route exact path="/aboutinfo">
            <AboutInfo />
          </Route>
          <Route exact path="/doctors">
            <Doctors />
          </Route>
          <Route exact path="/services">
            <Services />
          </Route>
          <Route exact path="/clinicdata">
            <ClinicData />
          </Route>
          <Route exact path="/gallery">
            <Gallery />
          </Route>
          <Route exact path="/blogs">
            <Blogs />
          </Route>
        </Switch>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
