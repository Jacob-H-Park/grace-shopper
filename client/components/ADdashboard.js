import React from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Topbar from "./admin/Topbar";
import Sidebar from "./admin/Sidebar";
import Home from "./admin/Home";
import UserList from "./admin/UserList";
import User from "./admin/User";
import NewUser from "./admin/newUser";
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
                        <Route path="/products">
                            <ProductList />
                        </Route>
                        <Route path="/product/:productId">
                            <Product />
                        </Route>
                        <Route path="/newproduct">
                            <NewProduct />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>

    )
}

export default ADdashboard;