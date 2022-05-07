import React, { useEffect } from "react";
import {
  Link,
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Sidebar from "./components/Sidebar";
import Home from "./components/AdminHome";
import UserList from "./components/UserList";
import User from "./components/User";
import NewUser from "./components/newUser";
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

  return (
    <div>
      <Router>
        <div className="container">
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users" component={UserList} />
            <Route path="/user/:userId" component={User} />
            <Route path="/newUser" component={NewUser} />
            <Route path="/admin_products" component={ProductInfo} />
            <Route path="/add_product" component={AddProduct} />
            <Route path="/editflowerinfo/:id" component={EditProduct} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default AdminDashboard;
