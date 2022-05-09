import React, { useEffect } from "react";
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Sidebar from "./components/Sidebar";
import Home from "./components/AdminHome";
import UserList from "./components/UserList";
import User from "./components/User";
import NewUser from "./components/NewUser";
import ProductInfo from "../ProductInfo";
import AddProduct from "../AddProduct";
import EditProduct from "../EditProduct";
import "./style/AdminDashboard.css";
import { fetchUsers } from "../../store/users";

const AdminDashboard = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const { pathname } = useLocation();

  return (
    <div>
      {/* <Router> */}
        <div className="container">
          <Sidebar />
          { pathname === "/admin" ? <Home /> : null }
          <Switch>
            <Route path="/admin/home" component={Home} />
            <Route path="/admin/users" component={UserList} />
            <Route path="/admin/user/:userId" component={User} />
            <Route path="/admin/newUser" component={NewUser} />
            <Route path="/admin/products" component={ProductInfo} />
            <Route path="/admin/add_product" component={AddProduct} />
            <Route path="/admin/editflowerinfo/:id" component={EditProduct} />
          </Switch>
        </div>
      {/* </Router> */}
    </div>
  );
};

export default AdminDashboard;
