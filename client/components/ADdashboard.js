import React from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Topbar from "./admin/Topbar";
import Sidebar from "./admin/Sidebar";
import Home from "./admin/Home";
import UserList from "./admin/UserList";
import User from "./admin/User";
import NewUser from "./admin/newUser";
import ProductInfo from "./ProductInfo";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import "./ADdashboard.css";

const ADdashboard = ()=>{
    return (
        <div>
            {/* <Link to="/admin_products">View Products</Link>
            <Link to="/admin_orders">View Orders</Link>
            <Link to="/admin_promotion">View Promotion</Link> */}
            <Router>
                {/* <Topbar /> */}
                <div className="container">
                    <Sidebar />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/users">
                            <UserList />
                        </Route>
                        <Route path="/user/:userId">
                            <User />
                        </Route>
                        <Route path="/newUser">
                            <NewUser />
                        </Route>
                        <Route path="/admin_products">
                            <ProductInfo />
                        </Route>
                        <Route path="/add_product">
                            <AddProduct />
                        </Route>
                        {/* <Route path="/editflowerinfo/:id">
                            <EditProduct />
                        </Route> */}
                    </Switch>
                </div>
            </Router>
        </div>

    )
}

export default ADdashboard;