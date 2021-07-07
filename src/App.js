import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "../src/App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SliderImages from "./pages/SliderImages/SliderImages";
import AboutInfo from "./pages/AboutInfo/AboutInfo";
import Doctors from "./pages/Doctors/Doctors";

// import User from "./pages/user/User";
// import NewUser from "./pages/newUser/NewUser";
// import ProductList from "./pages/productList/ProductList";
// import Product from "./pages/product/Product";
// import NewProduct from "./pages/newProduct/NewProduct";

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
          {/* <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>  */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
